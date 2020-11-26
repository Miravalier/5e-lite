/**
 * @extends {ActorSheet}
 */
export class DndCharacterSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd", "sheet", "actor"],
      template: "systems/5e-lite/html/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats_tab"}],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.isCharacter = true;
    data.isNPC = false;
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if ( !this.options.editable ) return;

    html.find('.inventory .item .use').click(ev => {
        const node = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(node.data("itemId"));
        console.log(item);
    });

    html.find('.inventory .item .edit').click(ev => {
        const node = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(node.data("itemId"));
        item.sheet.render(true);
    });

    html.find('.inventory .item .delete').click(ev => {
        const node = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(node.data("itemId"));
        Dialog.confirm({
            title: `Delete ${item.name}?`,
            content: "",
            yes: html => {
                this.actor.deleteOwnedItem(node.data("itemId"));
            },
            no: () => {},
            defaultYes: false
        });
    });

    html.find('.new-item').click(async ev => {
        const node = $(ev.currentTarget);
        const content = await renderTemplate("systems/5e-lite/html/item-create.html");
        Dialog.confirm({
            title: "Create Item / Ability",
            content: content,
            yes: html => {
                const form = html[0].querySelector("form");
                let name = form.name.value;
                let type = form.type.value;
                if (!name)
                {
                    name = `New ${type}`;
                }
                this.actor.createOwnedItem({
                    name: name,
                    type: type
                });
            },
            no: () => {},
            defaultYes: false
        });
    });
  }

  /* -------------------------------------------- */

  /** @override */
  _updateObject(event, formData) {
    return this.object.update(formData);
  }

}

export class DndNpcSheet extends DndCharacterSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["dnd", "sheet", "actor"],
      template: "systems/5e-lite/html/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats_tab"}],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.isCharacter = false;
    data.isNPC = true;
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if ( !this.options.editable ) return;

  }

  /* -------------------------------------------- */

  /** @override */
  _updateObject(event, formData) {
    return this.object.update(formData);
  }

}
