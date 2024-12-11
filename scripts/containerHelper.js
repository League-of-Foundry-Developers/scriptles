import { socketlibSocket } from "./GMAction.js";
import { libWrapper } from "./module.js";


export function setupContainerHelpers() {
  Hooks.on("dnd5e.dropItemSheetData", processSheetDropData);
  Hooks.on("dropActorSheetData", processSheetDropData);
}

const processSheetDropData = async (actorOrItem, sheet, data, ) => {
  if (data.type !== "Item") return;
  const actorRemove = game.settings.get("dnd5e-scriptlets", "AutoRemoveItemsFromActor");
  const containerRemove = game.settings.get("dnd5e-scriptlets", "AutoRemoveItems");
  if (actorRemove === "none" && containerRemove === "none") return;
  const sourceItem = fromUuidSync(data.uuid);
  if (["spell", "feat"].includes(sourceItem.type)) return;
  let targetActor = actorOrItem;
  if (actorOrItem instanceof Item) targetActor = actorOrItem.parent;
  if (sourceItem?.parent instanceof Actor && targetActor !== sourceItem.parent) { // dropped from an actor
    if (actorRemove === "removeAll"
      || (sourceItem.parent.type === "character" && ["removeCharacter", "removeCharacterGroup", "removeCharacterNPC"].includes(actorRemove))
      || (sourceItem.parent.type === "npc" && ["removeNPC", "removeCharacterNPC", "removeNPCGroup"].includes(actorRemove))
      || (sourceItem.parent.type === "group" && ["removeGroup", "removeCharacterGroup", "removeNPCGroup"].includes(actorRemove))) { // dropped from inventory
      if (sourceItem.isOwner) await sourceItem.delete({ deleteContents: true });
      else await socketlibSocket.executeAsGM("deleteItem", sourceItem.uuid, { deleteContents: true });
    }
  } else if (!sourceItem.parent && sourceItem.container) { // dropped from a world container to an actor
    if (["removeWorld"].includes(containerRemove)) {
      if (sourceItem.isOwner) await sourceItem.delete({ deleteContents: true });
      else await socketlibSocket.executeAsGM("deleteItem", sourceItem.uuid, { deleteContents: true });
    }
  }
}