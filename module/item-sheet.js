export class DndItemSheet extends ItemSheet {

    storeValue(path, value) {
        if (!value)
        {
            value = "";
        }
        let newFieldId = "_" + randomID(16);
        let newField = document.createElement("div");
        newField.innerHTML = `<input class="invisible" type="text" name="${path.replace('$id', newFieldId)}" value="${value}"/>`;
        newField = newField.children[0];
        this.form.appendChild(newField);
    }

    deleteValue(container_path, id) {
        const updates = {_id: this.object._id};
        const removal_ids = {};
        removal_ids[`-=${id}`] = null;
        updates[container_path] = removal_ids;
        this.object.update(updates);
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.isActive = false;
        data.isPassive = false;
        data.isConsumable = false;
        data.isMisc = false;
        return data;
    }

    /* -------------------------------------------- */

    /** @override */
    _updateObject(event, formData) {
        // Update the Actor with the new form values.
        return this.object.update(formData);
    }
}


export class ActiveAbilitySheet extends DndItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd", "sheet", "item"],
            template: "systems/5e-lite/html/active-ability-sheet.html",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description_tab"}],
        });
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        html.find(".template .add-button").click(async ev => {
            this.storeValue("data.template.$id.label", "Label");
            await this._onSubmit(ev);
        });

        html.find(".template .delete-button").click(async ev => {
            const row = ev.target.closest(".row");
            this.deleteValue("data.template", row.dataset.key);
            row.parentElement.removeChild(row);
            await this._onSubmit(ev);
        });

        html.find(".template .up-button").click(async ev => {
            const row = $(ev.target.closest(".row"));
            const key = row.data("key");
            const otherKey = row.prev().data("key");
            if (!otherKey) return;
            const template = this.item.data.data.template;
            const updates = {};
            updates[`data.template.${key}.target_type`] = template[otherKey].target_type;
            updates[`data.template.${key}.label`] = template[otherKey].label;
            updates[`data.template.${key}.formula`] = template[otherKey].formula;
            updates[`data.template.${otherKey}.target_type`] = template[key].target_type;
            updates[`data.template.${otherKey}.label`] = template[key].label;
            updates[`data.template.${otherKey}.formula`] = template[key].formula;
            this.item.update(updates);
        });

        html.find(".template .down-button").click(async ev => {
            const row = $(ev.target.closest(".row"));
            const key = row.data("key");
            const otherKey = row.next().data("key");
            if (!otherKey) return;
            const template = this.item.data.data.template;
            const updates = {};
            updates[`data.template.${key}.target_type`] = template[otherKey].target_type;
            updates[`data.template.${key}.label`] = template[otherKey].label;
            updates[`data.template.${key}.formula`] = template[otherKey].formula;
            updates[`data.template.${otherKey}.target_type`] = template[key].target_type;
            updates[`data.template.${otherKey}.label`] = template[key].label;
            updates[`data.template.${otherKey}.formula`] = template[key].formula;
            this.item.update(updates);
        });

        html.find(".phrases .add-button").click(async ev => {
            this.storeValue("data.usage_phrases.$id");
            await this._onSubmit(ev);
        });

        html.find(".phrases .delete-button").click(async ev => {
            const row = ev.target.closest(".row");
            this.deleteValue("data.usage_phrases", row.dataset.key);
            row.parentElement.removeChild(row);
            await this._onSubmit(ev);
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.isActive = true;
        return data;
    }

    /** @override */
    _updateObject(event, formData) {
        // Update the Actor with the new form values.
        return this.object.update(formData);
    }
}


export class PassiveAbilitySheet extends DndItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd", "sheet", "item"],
            template: "systems/5e-lite/html/passive-ability-sheet.html",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description_tab"}],
        });
    }

    /** @override */
	activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.isPassive = true;
        return data;
    }
}


export class ConsumableSheet extends DndItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd", "sheet", "item"],
            template: "systems/5e-lite/html/consumable-sheet.html",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description_tab"}],
        });
    }

    /** @override */
	activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        html.find(".template .add-button").click(async ev => {
            ev.preventDefault();
            this.storeValue("data.template.$id.label", "Label");
            await this._onSubmit(ev);
        });

        html.find(".template .delete-button").click(async ev => {
            ev.preventDefault();
            const row = ev.target.closest(".row");
            this.deleteValue("data.template", row.dataset.key);
            row.parentElement.removeChild(row);
            await this._onSubmit(ev);
        });
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.isConsumable = true;
        return data;
    }
}


export class MiscSheet extends DndItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["dnd", "sheet", "item"],
            template: "systems/5e-lite/html/misc-sheet.html",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description_tab"}],
        });
    }

    /** @override */
	activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;
    }

    /** @override */
    getData() {
        const data = super.getData();
        data.isMisc = true;
        return data;
    }
}
