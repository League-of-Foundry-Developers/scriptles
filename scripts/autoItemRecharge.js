import { systemString, localizeHeader, systemConfig } from "./module.js";

export function setupAutoItemRecharge() {
  Hooks.on("updateCombat", async function (combat, update, context, userId) {
    const rechargeSetting = game.settings.get("dnd5e-scriptlets", "autoItemRecharge");
    if ([undefined, false, "off"].includes(rechargeSetting)) return;
    if (!game.users?.activeGM?.isSelf || context.direction !== 1 || combat.combatant?.defeated) return;

    let actor = combat.combatant.actor;
    if (rechargeSetting.endsWith("End")) {
      const turn = (combat.turn + combat.turns.length - 1) % combat.turns.length;
      actor = combat.turns[turn]?.actor;
    }
    doItemRecharges(actor, rechargeSetting);
    return true;
  });

  Hooks.on("createCombatant", async function (combatant, options, user) {
    const rechargeSetting = game.settings.get("dnd5e-scriptlets", "autoItemRecharge");
    if ([undefined, false, "off"].includes(rechargeSetting)) return;
    if (!game.users?.activeGM?.isSelf || combatant?.defeated) return;
    const actor = combatant.actor;
    doItemRecharges(actor, rechargeSetting);
  });
}
async function doItemRecharges(actor, rechargeSetting) {
  for (const item of actor.items) {
    let needsRecharge = false;
    const recovery = item.system.uses?.recovery;
    if (item.system.uses?.value < item.system.uses?.max && recovery?.length > 0) {
      for (let profile of recovery) {
        if (profile.period === "recharge") {
          needsRecharge = true;
          break
        }
      }
    }
    if (needsRecharge) doSingleRecharge(item, rechargeSetting);
    if (item.system.acitvities) for (let activity of item.system.activities) {
      if (activity.uses?.value >= activity.uses?.max) continue;
      const recovery = activity.uses?.recovery;
      needsRecharge = false;
      if (!recovery || recovery.length === 0) continue;
      needsRecharge = false;
      for (let profile of recovery) {
        if (profile.period === "recharge") {
          needsRecharge = true;
          break
        }
      }
      if (needsRecharge) doSingleRecharge(activity, rechargeSetting);
    }
  }
}

async function doSingleRecharge(itemOrActivity, rechargeSetting) {
  if (["silent", "whisper"].includes(rechargeSetting)) {
    // rollRecharge ignores changes made to message.create in the preRollRechargeV2 hook
    Hooks.once(`${systemString}.preRollRecharge`, (itemOrActivity, hookdData) => {
      hookdData.chatMessage = false;
      return true;
    });
    Hooks.once(`${systemString}.preRollRechargeV2`, (config, dialog, message) => {
      message.create = false;
      if(config.subject.actor.type === "npc") message.rollMode = "blindroll";
      return true;
    });
  }
  if (rechargeSetting === "whisper")
    Hooks.once(`${systemString}.rollRechargeV2`, (rolls, options) => {
      const success = rolls.reduce((result, r) => result ||= r.isSuccess, false);
      // const flavor = `${localizeHeader}.ItemRechargeCheck`;
      const flavor = game.i18n.format("DND5E.ItemRechargeCheck", {
        name: itemOrActivity.name,
        result: game.i18n.localize(`DND5E.ItemRecharge${success ? "Success" : "Failure"}`)
      });
      rolls[0].toMessage({
        flavor,
        speaker: ChatMessage.getSpeaker({ actor: itemOrActivity.actor, token: itemOrActivity.actor.token })
      },
        { rollMode: "gmroll" }
      );
    });
  await itemOrActivity.system?.uses?.rollRecharge() ?? itemOrActivity.uses?.rollRecharge();
}
