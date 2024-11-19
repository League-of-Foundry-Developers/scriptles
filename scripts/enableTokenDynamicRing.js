export function setupEnableTokenDynamicRing() {
  Hooks.on("preCreateToken", async (tokenDocument) => {
    let ringColor = game.settings.get("dnd5e-scriptlets", "EnableTokenDynamicRingColour");
    if (ringColor === "Player Color") {
      const player = playerForActor(tokenDocument.actor);
      ringColor = player?.color ?? "None";
    } else if (ringColor !== "None") {
      ringColor = getHexColor(ringColor);
    }
    const backgroundColor = game.settings.get("dnd5e-scriptlets", "EnableTokenDynamicRingBackgroundColour");
    if (game.settings.get("dnd5e-scriptlets", "EnableTokenDynamicRing") === false) return;

      const options = {
        ring: {
          enabled: true,
        },
      };
      if (ringColor !== "None" && !tokenDocument.ring?.colors?.ring) {
        foundry.utils.setProperty(options, "ring.colors.ring", `${getHexColor(ringColor)}`);
      }
      if (backgroundColor !== "None" && !tokenDocument.ring?.colors?.background) {
        foundry.utils.setProperty(options, "ring.colors.background", `${getHexColor(backgroundColor)}`);
      }
      tokenDocument.updateSource(options)
  });
}

function getHexColor(colorStr) {
  var a = document.createElement('div');
  a.style.color = colorStr;
  var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) { return parseInt(a, 10); });
  document.body.removeChild(a);
  return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
}

export function playerForActor(actor) {
  if (!actor) return undefined;
  let user;
  //@ts-expect-error DOCUMENT_PERMISSION_LEVELS
  const OWNERSHIP_LEVELS = foundry.utils.isNewerVersion(game.data.version, "12.0") ? CONST.DOCUMENT_OWNERSHIP_LEVELS : CONST.DOCUMENT_PERMISSION_LEVELS;
  const ownwership = actor.ownership;
  // find an active user whose character is the actor
  if (actor.hasPlayerOwner) user = game.users?.find(u => u.character?.id === actor?.id && u.active);
  if (!user) // no controller - find the first owner who is active
    user = game.users?.players.find(p => p.active && ownwership[p.id ?? ""] === OWNERSHIP_LEVELS.OWNER)
  if (!user) // find a non-active owner
    user = game.users?.players.find(p => p.character?.id === actor?.id);
  if (!user) // no controlled - find an owner that is not active
    user = game.users?.players.find(p => ownwership[p.id ?? ""] === OWNERSHIP_LEVELS.OWNER)
  if (!user && ownwership.default === OWNERSHIP_LEVELS.OWNER) {
    // does anyone have default owner permission who is active
    user = game.users?.players.find(p => p.active && ownwership[p.id] === OWNERSHIP_LEVELS.INHERIT)
  }
  // if all else fails it's an active gm.
  //@ts-expect-error activeGM
  if (!user) user = game.users?.activeGM
  return user;
}