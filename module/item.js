import { selectToken, selectTokens } from "./ui.js";
import {
    sendTemplate,
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
    cast() {
        if (!this.actor) return;
        this.actor.update({
            "data.mana.value": this.actor.data.data.mana.value - this.data.data.cost
        });
    }

    use(target) {
        if (this.type == "Active Ability")
        {
            if (this.actor)
            {
                this.ownedActiveUse(target);
            }
            else
            {
                this.activeUse(target);
            }
        }
        else if (this.type == "Consumable")
        {
            this.consumableUse(target);
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
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }

    async ownedActiveUse() {
        const targetNames = new Set();
        const rolls = await chatTemplateRolls(this, targetNames);
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateUsage(this, targetNames)}
            ${rolls}
        `);
    }

    async ownedActiveShow() {
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }

    miscUse() {
    }

    miscShow() {
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }

    ownedMiscUse() {
    }

    ownedMiscShow() {
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }

    passiveShow() {
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }

    ownedPassiveShow() {
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }

    consumableUse() {
    }

    consumableShow() {
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }

    ownedConsumableUse() {
    }

    ownedConsumableShow() {
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateDescription(this)}
        `);
    }
}
