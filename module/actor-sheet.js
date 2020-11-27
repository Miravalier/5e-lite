/* @Item[rVHTJNj69junL7fL]{Infusion: Resistant Armor} */
const itemLinkRegex = /@Item\[([a-z0-9_-]+)\]\{([^}]+)\}/gi
function convertItemLinks(content)
{
    return content.replace(
        itemLinkRegex,
        `<a class="item-link" role="button" data-item-id="$1">$2</a>`
    );
}

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
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "identity_tab"}],
      dragDrop: [{dragSelector: ".inventory .item"}]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.isCharacter = true;
    data.isNPC = false;

    if (this.actor.data.data["class"])
    {
        const race = this.actor.data.data.race;
        const raceJournal = game.journal.find(entry => entry.name == race);
        data.raceInfo = convertItemLinks(raceJournal.data.content);

        const _class = this.actor.data.data["class"];
        const _classJournal = game.journal.find(entry => entry.name == _class);
        data.classInfo = convertItemLinks(_classJournal.data.content);
    }

    return data;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.item-link').click(ev => {
        const node = $(ev.currentTarget);
        const item = game.items.get(node.data("itemId"));
        item.sheet.render(true);
    });

    // Everything below here is only needed if the sheet is editable
    if ( !this.options.editable ) return;

    html.find('.inventory .item .show').click(ev => {
        const node = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(node.data("itemId"));
        item.show();
    });

    html.find('.inventory .item .use').click(ev => {
        const node = $(ev.currentTarget).parents(".item");
        const item = this.actor.getOwnedItem(node.data("itemId"));
        item.use();
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
      dragDrop: [{dragSelector: ".inventory .item"}]
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
