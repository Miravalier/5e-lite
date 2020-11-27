import { selectToken, selectTokens } from "./ui.js";
import { ChatTemplate } from "./chat.js";

/**
 * @extends {Item}
 */
export class DndItem extends Item {
    /** @override */
    prepareData() {
        super.prepareData();
    }


    /** @override */
    getRollData() {
        const data = super.getRollData();
        return data;
    }

    // Item use for any item.
    use() {
        if (this.type == "Active Ability")
        {
            if (this.actor)
            {
                this.ownedActiveAbilityUse();
            }
            else
            {
                this.activeAbilityUse();
            }
        }
        else if (this.type == "Passive Ability")
        {
            this.passiveUse();
        }
        else if (this.type == "Miscellaneous")
        {
            this.miscUse();
        }
        else if (this.type == "Consumable")
        {
            this.consumableUse();
        }
    }

    show() {
        if (this.type == "Active Ability")
        {
            if (this.actor)
            {
                this.ownedActiveAbilityShow();
            }
            else
            {
                this.activeAbilityShow();
            }
        }
        else if (this.type == "Passive Ability")
        {
            this.passiveShow();
        }
        else if (this.type == "Miscellaneous")
        {
            this.miscShow();
        }
        else if (this.type == "Consumable")
        {
            this.consumableShow();
        }
    }


    // Specific use functions for each item type
    activeAbilityUse() {
    }

    activeAbilityShow() {
    }

    async ownedActiveAbilityShow() {
        let template = new ChatTemplate(this);
        template.template = {};
        template.send();
    }

    async ownedActiveAbilityUse() {
        const token = await selectToken(`${this.name} Target`);
        const tokens = await selectTokens(`${this.name} Targets`);
        let template = new ChatTemplate(this);
        template.description = "";
        template.send();
    }

    miscUse() {
    }

    miscShow() {
    }

    passiveUse() {
    }

    passiveShow() {
    }

    consumableUse() {
    }

    consumableShow() {
    }
}
