export function setupGriddedGridless() {
  const libWrapper = globalThis.libWrapper;
  globalThis.libWrapper?.register("dnd5e-scriptlets", "canvas.grid.measureDistances", measureDistances, "MIXED");
}

function measureDistances(wrapped, segments, options = {}) {
  //@ts-expect-error .grid - Only do our own if is a gridless grid, calculating in grid spaces and we are enabled
  if (canvas?.grid?.constructor.name !== "BaseGrid" || !options.gridSpaces || !game.settings.get("dnd5e-scriptlets", "griddedGridless"))
    return wrapped(segments, options);
  return foundry.grid.SquareGrid.prototype.measureDistances.call(this, segments, options);
}