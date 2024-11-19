import { registerSettings } from "./settings.js";
import { setupLukasItemRarityColors } from "./item-rarity-colors.js";
import { setupLukasFadeUnprepared } from "./fade-unprepared.js";
import { setupLegendaryRecharge } from "./legendaryRecharge.js";
import { setupAutoItemRecharge } from "./autoItemRecharge.js";
import { setupAutoRollUnlinkedHP } from "./autoRollUnlinkedHP.js";
import { setupTokenResizer } from "./tokenResizer.js";
import { setupAlternativeAdvantage } from "./alternativeAdvantage.js";
import { setupCollapsibleActorSections } from "./collapsibleActorSections.js";
import { setupAmmoRecovery } from "./ammoRecovery.js";
import { setupSilentInitiative } from "./silentInitiative.js";
import { setupUpdateCreatedOrigins } from "./updateCreatedOrigins.js";
import { setupSocket } from "./GMAction.js";
import { setupGriddedGridless } from "./griddedGridless.js";
import { initActorDispositionColors } from "./ActorDispositionColors.js";
import { setupContainerHelpers } from "./containerHelper.js";
import { setupEnableTokenDynamicRing } from "./enableTokenDynamicRing.js";
import { setupTemplatePreview } from "./templatePreview.js";

export let systemString;
export let systemConfig;
export let localizeHeader;
export let libWrapper;

Hooks.once("init", async function () {
  libWrapper = globalThis.libWrapper;
  console.log("dnd5e-scriptlets | doing init setup");
  foundry.utils.setProperty(globalThis, "dnd5eScriptlets.api", {});
  registerSettings();
  setupTokenResizer();
  setupTemplatePreview();
  systemString = game.system.id;
  systemConfig = game.system.config;
  switch (systemString) {
    case "dnd5e":
      localizeHeader = "DND5E";
      break;
    case "sw5e":
      localizeHeader = "SW5E";
      break;
    case "dcc":
      localizeHeader = "DCC";
      break;
  }
  initActorDispositionColors();
});


Hooks.once("setup", () => {
  registerSettings();

  console.log("dnd5e-scriptlets | doing setup");
});

Hooks.once("ready", async function () {
  console.log("dnd5e-scriptlets | Doing ready setup");
  setupSocket();
  setupLukasItemRarityColors();
  setupLukasFadeUnprepared();
  setupLegendaryRecharge();
  setupAutoItemRecharge();
  setupAutoRollUnlinkedHP();
  setupAlternativeAdvantage();
  setupCollapsibleActorSections();
  setupAmmoRecovery();
  setupSilentInitiative();
  setupUpdateCreatedOrigins();
  setupGriddedGridless();
  setupContainerHelpers();
  setupEnableTokenDynamicRing();
  const module = game.modules.get("dnd5e-scriptlets");
  if (module) {
    module.api = globalThis.dnd5eScriptlets.api;
  }
});

export function geti18nOptions(key) {
  const translations = game.i18n.translations["dnd5e-scriptlets"] ?? {};
  const fallback = game.i18n._fallback["dnd5e-scriptlets"] ?? {};
  //@ts-ignore _fallback not accessible
  let translation = translations[key] ?? fallback[key] ?? {};
  return translation;
}