import { selectToken, selectTokens } from "./ui.js";
import {
    chatTemplateHeader,
    chatTemplateDescription,
    chatTemplateUsage,
    chatTemplateRolls
} from "./chat.js";

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
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    async ownedActiveAbilityUse() {
        const targetNames = new Set();
        const rolls = await chatTemplateRolls(this, targetNames);
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateUsage(this, targetNames)}
                ${rolls}
            `
        });
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
