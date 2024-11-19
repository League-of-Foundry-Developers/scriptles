import { geti18nOptions } from "./module.js";

export function registerSettings() {
  game.settings.register("dnd5e-scriptlets", "lukasItemRarityColors", {
    name: game.i18n.localize("dnd5e-scriptlets.LukasItemRarityColors.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.LukasItemRarityColors.Hint"),
    scope: "world",
    default: false,
    config: true,
    type: Boolean,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "lukasFadeUnprepared", {
    name: game.i18n.localize("dnd5e-scriptlets.LukasFadeUnprepared.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.LukasFadeUnprepared.Hint"),
    scope: "world",
    default: false,
    config: true,
    type: Boolean,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "ammoTracker", {
    name: game.i18n.localize("dnd5e-scriptlets.AmmoTracker.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.AmmoTracker.Hint"),
    scope: "world",
    default: false,
    type: Boolean,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "ammoRecoveryMessage", {
    name: game.i18n.localize("dnd5e-scriptlets.AmmoRecoveryMessage.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.AmmoRecoveryMessage.Hint"),
    scope: "world",
    default: false,
    type: Boolean,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "legendaryRecharge", {
    name: game.i18n.localize("dnd5e-scriptlets.LegendaryRecharge.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.LegendaryRecharge.Hint"),
    scope: "world",
    default: false,
    type: Boolean,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "autoItemRecharge", {
    name: game.i18n.localize("dnd5e-scriptlets.AutoItemRecharge.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.AutoItemRecharge.Hint"),
    scope: "world",
    type: String,
    choices: geti18nOptions("AutoItemRechargeOptions"),
    default: false,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "autoRollUnlinkedHP", {
    name: game.i18n.localize("dnd5e-scriptlets.AutoRollUnlinkedHP.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.AutoRollUnlinkedHP.Hint"),
    scope: "world",
    type: String,
    default: "none",
    choices: {
      "none": "Do Not Roll",
      "rollOnly": "Roll HP only",
      "rollAndMessage": "Roll HP and send chat message"
    },
    config: true,
    requiresReload: false
  });

    game.settings.register("dnd5e-scriptlets", "tokenResizer", {
      name: game.i18n.localize("dnd5e-scriptlets.TokenResizer.Name"),
      hint: game.i18n.localize("dnd5e-scriptlets.TokenResizer.Hint"),
      scope: "world",
      type: Boolean,
      default: false,
      config: true,
      requiresReload: false
    });

    game.settings.register("dnd5e-scriptlets", "alternativeAdvantage", {
    name: game.i18n.localize("dnd5e-scriptlets.AlternativeAdvantage.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.AlternativeAdvantage.Hint"),
    scope: "world",
    type: String,
    default: "",
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "ActorCollapsibleSection", {
    name: game.i18n.localize("dnd5e-scriptlets.ActorCollapsibleSection.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.ActorCollapsibleSection.Hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "SilentInitiative", {
    name: game.i18n.localize("dnd5e-scriptlets.SilentInitiative.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.SilentInitiative.Hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "UpdateCreatedOrigins", {
    name: game.i18n.localize("dnd5e-scriptlets.UpdateCreatedOrigins.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.UpdateCreatedOrigins.Hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "griddedGridless", {
    name: game.i18n.localize("dnd5e-scriptlets.GriddedGridless.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.GriddedGridless.Hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "ActorDispositionColors", {
    name: game.i18n.localize("dnd5e-scriptlets.ActorDispositionColors.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.ActorDispositionColors.Hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "AutoRemoveItems", {
    name: game.i18n.localize("dnd5e-scriptlets.AutoRemoveItems.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.AutoRemoveItems.Hint"),
    scope: "world",
    type: String,
    choices: {
      "none": "Do not auto remove",
      "removeWorld": "Auto remove from world containers",
    },
    default: "none",
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "AutoRemoveItemsFromActor", {
    name: game.i18n.localize("dnd5e-scriptlets.AutoRemoveItemsFromActor.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.AutoRemoveItemsFromActor.Hint"),
    scope: "world",
    type: String,
    choices: {
      "none": "Do not auto remove",
      "removeAll": "Auto remove from any actor",
      "removeCharacter": "Auto remove from characters",
      "removeNPC": "Auto remove from npcs",
      "removeGroup": "Auto remove from group actors",
      "removeCharacterGroup": "Auto remove from characters & groups",
      "removeNPCGroup": "Auto remove from npcs & groups",
      "removeCharacterNPC": "Auto remove from characters & npcs",
    },
    default: "none",
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "EnableTokenDynamicRing", {
    name: game.i18n.localize("dnd5e-scriptlets.EnableTokenDynamicRing.Name"),
    hint: game.i18n.localize("dnd5e-scriptlets.EnableTokenDynamicRing.Hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: false
  });


  game.settings.register("dnd5e-scriptlets", "EnableTokenDynamicRingColour", {
    name: game.i18n.localize("dnd5e-scriptlets.EnableTokenDynamicRingColour.Name"),
    scope: "world",
    type: String,
    default: "None",
    choices: colorList.reduce((acc, c) => { acc[c] = c; return acc }, { "None": "None", "Player Color": "Player Color" }),
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "EnableTokenDynamicRingBackgroundColour", {
    name: game.i18n.localize("dnd5e-scriptlets.EnableTokenDynamicRingBackgroundColour.Name"),
    scope: "world",
    type: String,
    default: "None",
    choices: colorList.reduce((acc, c) => { acc[c] = c; return acc }, { "None": "None" }),
    config: true,
    requiresReload: false
  });

  game.settings.register("dnd5e-scriptlets", "TemplatePreview", {
    name: game.i18n.localize("dnd5e-scriptlets.TemplatePreview.Name"),
    name: game.i18n.localize("dnd5e-scriptlets.TemplatePreview.Hint"),
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    requiresReload: true
  });
}

const colorList = [
  `AliceBlue`,
  `AntiqueWhite`,
  `Aqua`,
  `Aquamarine`,
  `Azure`,
  `Beige`,
  `Bisque`,
  `Black`,
  `BlanchedAlmond`,
  `Blue`,
  `BlueViolet`,
  `Brown`,
  `BurlyWood`,
  `CadetBlue`,
  `Chartreuse`,
  `Chocolate`,
  `Coral`,
  `CornflowerBlue`,
  `Cornsilk`,
  `Crimson`,
  `Cyan`,
  `DarkBlue`,
  `DarkCyan`,
  `DarkGoldenRod`,
  `DarkGray`,
  `DarkGrey`,
  `DarkGreen`,
  `DarkKhaki`,
  `DarkMagenta`,
  `DarkOliveGreen`,
  `Darkorange`,
  `DarkOrchid`,
  `DarkRed`,
  `DarkSalmon`,
  `DarkSeaGreen`,
  `DarkSlateBlue`,
  `DarkSlateGray`,
  `DarkSlateGrey`,
  `DarkTurquoise`,
  `DarkViolet`,
  `DeepPink`,
  `DeepSkyBlue`,
  `DimGray`,
  `DimGrey`,
  `DodgerBlue`,
  `FireBrick`,
  `FloralWhite`,
  `ForestGreen`,
  `Fuchsia`,
  `Gainsboro`,
  `GhostWhite`,
  `Gold`,
  `GoldenRod`,
  `Gray`,
  `Grey`,
  `Green`,
  `GreenYellow`,
  `HoneyDew`,
  `HotPink`,
  `IndianRed`,
  `Indigo`,
  `Ivory`,
  `Khaki`,
  `Lavender`,
  `LavenderBlush`,
  `LawnGreen`,
  `LemonChiffon`,
  `LightBlue`,
  `LightCoral`,
  `LightCyan`,
  `LightGoldenRodYellow`,
  `LightGray`,
  `LightGrey`,
  `LightGreen`,
  `LightPink`,
  `LightSalmon`,
  `LightSeaGreen`,
  `LightSkyBlue`,
  `LightSlateGray`,
  `LightSlateGrey`,
  `LightSteelBlue`,
  `LightYellow`,
  `Lime`,
  `LimeGreen`,
  `Linen`,
  `Magenta`,
  `Maroon`,
  `MediumAquaMarine`,
  `MediumBlue`,
  `MediumOrchid`,
  `MediumPurple`,
  `MediumSeaGreen`,
  `MediumSlateBlue`,
  `MediumSpringGreen`,
  `MediumTurquoise`,
  `MediumVioletRed`,
  `MidnightBlue`,
  `MintCream`,
  `MistyRose`,
  `Moccasin`,
  `NavajoWhite`,
  `Navy`,
  `OldLace`,
  `Olive`,
  `OliveDrab`,
  `Orange`,
  `OrangeRed`,
  `Orchid`,
  `PaleGoldenRod`,
  `PaleGreen`,
  `PaleTurquoise`,
  `PaleVioletRed`,
  `PapayaWhip`,
  `PeachPuff`,
  `Peru`,
  `Pink`,
  `Plum`,
  `PowderBlue`,
  `Purple`,
  `Red`,
  `RosyBrown`,
  `RoyalBlue`,
  `SaddleBrown`,
  `Salmon`,
  `SandyBrown`,
  `SeaGreen`,
  `SeaShell`,
  `Sienna`,
  `Silver`,
  `SkyBlue`,
  `SlateBlue`,
  `SlateGray`,
  `SlateGrey`,
  `Snow`,
  `SpringGreen`,
  `SteelBlue`,
  `Tan`,
  `Teal`,
  `Thistle`,
  `Tomato`,
  `Turquoise`,
  `Violet`,
  `Wheat`,
  `White`,
  `WhiteSmoke`,
  `Yellow`,
  `YellowGreen`,
];  