import { selectToken, selectTokens } from "./ui.js";
import {
    chatTemplateHeader,
    chatTemplateDescription,
    chatTemplateUsage,
    chatTemplateRolls
} from "./chat.js";


function walkFolder(folder, array)
{
    if (!array) array = [];

    folder.content.forEach(item => array.push(item));

    folder.children.forEach(child => {
        walkFolder(child, array);
    });

    return array;
}


export function raceItems(race)
{
    const racesFolder = game.folders.find(
        f => f.name === "Races" && f.type === "Item" && f.depth === 1
    );
    const raceFolder = racesFolder.children.find(f => f.name === race);
    return walkFolder(raceFolder);
}


export function classItems(cls)
{
    const classesFolder = game.folders.find(
        f => f.name === "Classes" && f.type === "Item" && f.depth === 1
    );
    const classFolder = classesFolder.children.find(f => f.name === cls);
    return walkFolder(classFolder);
}


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
                this.ownedActiveUse();
            }
            else
            {
                this.activeUse();
            }
        }
        else if (this.type == "Consumable")
        {
            this.consumableUse();
        }
    }

    show() {
        if (this.actor) {
            if (this.type === "Active Ability") {
                this.ownedActiveShow();
            }
            else if (this.type === "Passive Ability") {
                this.ownedPassiveShow();
            }
            else if (this.type === "Miscellaneous") {
                this.ownedMiscShow();
            }
            else if (this.type === "Consumable") {
                this.ownedConsumableShow();
            }
        }
        else
        {
            if (this.type === "Active Ability") {
                this.activeShow();
            }
            else if (this.type === "Passive Ability") {
                this.passiveShow();
            }
            else if (this.type === "Miscellaneous") {
                this.miscShow();
            }
            else if (this.type === "Consumable") {
                this.consumableShow();
            }
        }
    }


    // Specific use functions for each item type
    activeUse() {
    }

    activeShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    async ownedActiveUse() {
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

    async ownedActiveShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    miscUse() {
    }

    miscShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    ownedMiscUse() {
    }

    ownedMiscShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    passiveShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    ownedPassiveShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    consumableUse() {
    }

    consumableShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }

    ownedConsumableUse() {
    }

    ownedConsumableShow() {
        ChatMessage.create({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker(),
            content: `
                ${chatTemplateHeader(this)}
                ${chatTemplateDescription(this)}
            `
        });
    }
}
