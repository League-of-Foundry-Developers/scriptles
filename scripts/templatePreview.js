export function setupTemplatePreview() {
  Hooks.on("getSceneControlButtons", (controls) => {
    if (!game.user.isGM || !game.settings.get("dnd5e-scriptlets", "TemplatePreview")) return;
    const token = controls.find((c) => c.name === "measure");

    if (token) {
      let i = token.tools.length;
      token.tools.splice(i, 0, {
        name: "templatePreview",
        title: game.i18n.localize("dnd5e-scriptlets.TemplatePreview.Name"),
        icon: "fas fa-bullseye",
        visible: true,
        onClick: () => {
          showTemplateDialog();
        },
        button: true,
      });
    }
  });
}

async function showTemplateDialog() {
  let pickedToken;
  (_token && _token.actor?.ownership[game.user.id]) ? pickedToken = _token : pickedToken = canvas.tokens.placeables.find(token => token.actor?.hasPlayerOwner && token.actor?.ownership[game.user.id] > 0);
  if (!pickedToken) return;
  const items = pickedToken.actor.items.filter(i => {
    const targetType = i.system.target?.type;
    const targetValue = i.system.target?.value;

    // Exclude non-template type items
    if (!targetValue || !["cone", "cube", "cylinder", "line", "radius", "sphere", "square", "wall"].includes(targetType)) {
      return false;
    }

    // Only include prepared spells
    if (i.type === "spell" && (i.system.level > 0 && i.system.preparation?.mode === "prepared" && !i.system.preparation.prepared)) {
      return false;
    }

    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const itemOptions = items.map(item => {
    const targetType = item.system.target.type;
    const targetSize = item.system.target.value;
    return `<option value="${item.id}" data-type="${targetType}" data-size="${targetSize}">${item.name} (${targetSize} ft ${targetType})</option>`;
  }).join("");

  let previewInProgress = false;

  new Dialog({
    title: `Template Preview: ${pickedToken.actor.name}`,
    content: `
      <form>
      ${items.length > 0 ? `
        <div class="form-group">
          <label for="item-select">Select Item AoE:</label>
          <select id="item-select" name="item-select" ${previewInProgress ? 'disabled' : ''}>
            <option value="" selected>-- Select an Item --</option>
            ${itemOptions}
          </select>
        </div>
        <hr/>
      ` : ''}
        <div class="form-group">
          <label>Select Generic AoE:</label>
          <div class="template-buttons" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            <button type="button" id="circle-template" class="template-btn" ${previewInProgress ? 'disabled' : ''} style="display: flex; align-items: center; gap: 10px;">
              <i class="fas fa-circle"></i> Circle
            </button>
            <button type="button" id="rect-template" class="template-btn" ${previewInProgress ? 'disabled' : ''} style="display: flex; align-items: center; gap: 10px;">
              <i class="fas fa-square"></i> Square
            </button>
            <button type="button" id="cone-template" class="template-btn" ${previewInProgress ? 'disabled' : ''} style="display: flex; align-items: center; gap: 10px;">
              <i class="fa-solid fa-triangle"></i> Cone
            </button>
            <button type="button" id="ray-template" class="template-btn" ${previewInProgress ? 'disabled' : ''} style="display: flex; align-items: center; gap: 10px;">
              <i class="fas fa-arrows-alt-h"></i> Line
            </button>
          </div>
        </div>
        <hr/>
        <div class="form-group">
          <label for="template-size">Generic AoE Size (ft):</label>
          <div style="display: flex; align-items: center;">
            <input type="range" id="template-size" name="template-size" value="20" min="5" max="120" step="5" style="flex: 1;" oninput="document.getElementById('template-size-display').value = this.value" ${previewInProgress ? 'disabled' : ''}>
            <input type="number" id="template-size-display" name="template-size-display" value="20" min="5" max="120" step="5" style="width: 50px; margin-left: 10px;" oninput="document.getElementById('template-size').value = this.value" ${previewInProgress ? 'disabled' : ''}>
          </div>
        </div>
      </form>
    `,
    buttons: {},
    render: html => {
      function setControlsDisabled(disabled) {
        html.find('#item-select').prop('disabled', disabled);
        html.find('.template-btn').prop('disabled', disabled);
        html.find('#template-size').prop('disabled', disabled);
        html.find('#template-size-display').prop('disabled', disabled);
      }

      html.find('#item-select').change(function () {
        if (previewInProgress) return;

        const selectedItem = items.find(item => item.id === this.value);
        if (selectedItem) {
          const targetSize = selectedItem.system.target.value;
          const targetType = selectedItem.system.target.type;
          html.find('#template-size').val(targetSize).trigger("input");
          html.find('#template-size-display').val(targetSize);

          switch (targetType) {
            case "sphere":
            case "radius":
            case "cylinder":
              html.find('#circle-template').click();
              break;
            case "cube":
            case "square":
              html.find('#rect-template').click();
              break;
            case "cone":
              html.find('#cone-template').click();
              break;
            case "wall":
            case "line":
              html.find('#ray-template').click();
              break;
          }
        }
      });

      async function handleTemplateClick(templateType) {
        if (previewInProgress) return;
        previewInProgress = true;
        setControlsDisabled(true);

        await previewTemplate(templateType);

        previewInProgress = false;
        setControlsDisabled(false);
      }

      html.find('#circle-template').click(() => handleTemplateClick('circle'));
      html.find('#rect-template').click(() => handleTemplateClick('rect'));
      html.find('#cone-template').click(() => handleTemplateClick('cone'));
      html.find('#ray-template').click(() => handleTemplateClick('ray'));
    },
    default: "cancel"
  }).render(true);
}

async function previewTemplate(templateType) {
  let size = document.getElementById('template-size').value;
  let distance = parseInt(size);
  let actualTemplateType;
  (templateType === "rect") ? actualTemplateType = "ray" : actualTemplateType = templateType;

  const templateData = {
    t: actualTemplateType,
    user: game.user.id,
    direction: 0,
    angle: templateType === "cone" ? 53.13 : templateType === "rect" ? 90 : 0,
    distance: distance,
    borderColor: "#FF0000",
    fillAlpha: 0.5,
    fillColor: game.user.color,
    hidden: false,
    width: templateType === 'rect' ? distance : undefined
  };

  const templateDoc = new CONFIG.MeasuredTemplate.documentClass(templateData, { parent: canvas.scene });
  const template = new game.dnd5e.canvas.AbilityTemplate(templateDoc);

  try {
    const createdTemplates = await template.drawPreview();

    if (createdTemplates.length > 0) {
      const firstTemplate = createdTemplates[0];
      await firstTemplate.delete();
    }

    game.user.targets.forEach(token => {
      token.setTarget(false, { user: game.user });
    });
  } catch (error) {
    console.error('Error during template preview:', error);
  }
}