/**
 * @extends {ActorSheet}
 */
export class SfsCharacterSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sfs", "sheet", "actor"],
      template: "systems/sfs/templates/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "tab_one"}],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.isCharacter = true;
    data.isNpc = false;
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

export class SfsNpcSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sfs", "sheet", "actor"],
      template: "systems/sfs/templates/actor-sheet.html",
      width: 600,
      height: 600,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "tab_one"}],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.isCharacter = false;
    data.isNpc = true;
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
