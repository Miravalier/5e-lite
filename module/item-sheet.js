/**
 * @extends {ItemSheet}
 */
export class SfsItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sfs", "sheet", "item"],
      template: "systems/sfs/templates/item-sheet.html",
      width: 520,
      height: 480,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "tab_one"}],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    return data;
  }

  /* -------------------------------------------- */

  /** @override */
	activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;
  }

  /* -------------------------------------------- */

  /** @override */
  _updateObject(event, formData) {
    // Update the Actor with the new form values.
    return this.object.update(formData);
  }
}
