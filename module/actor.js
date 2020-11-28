import {CLASS_DATA} from "./constants.js";
import {raceItems, classItems} from "./item.js";


/**
 * @extends {Actor}
 */
export class DndActor extends Actor {
    /** @override */
    prepareData() {
        super.prepareData();
    }

    async changeIdentity(race, cls) {
        const classData = CLASS_DATA[cls];
        // Set ability scores
        const data_updates = {};
        Object.entries(classData.scores).forEach(pair => {
            data_updates["data." + pair[0]] = pair[1];
        });
        data_updates["data.mana.value"] = classData.mana;
        data_updates["data.mana.max"] = classData.mana;
        const starting_hp = classData.hp + classData.scores["constitution"] * 8;
        data_updates["data.hp.value"] = starting_hp;
        data_updates["data.hp.max"] = starting_hp;
        this.update(data_updates);

        // Remove old race and class items
        this.getEmbeddedCollection("OwnedItem").forEach(async item => {
            await this.deleteOwnedItem(item._id);
        });

        // Add new race and class items
        for (let item of raceItems(race)) {
            await this.createOwnedItem(item);
        }

        for (let item of classItems(cls)) {
            await this.createOwnedItem(item);
        }
    }

    /** @override */
    getRollData() {
        const classData = CLASS_DATA[data["class"]];
        const data = super.getRollData();
        data["str"] = parseInt((data["strength"]-10)/2);
        data["dex"] = parseInt((data["dexterity"]-10)/2);
        data["con"] = parseInt((data["constitution"]-10)/2);
        data["cha"] = parseInt((data["charisma"]-10)/2);
        data["wis"] = parseInt((data["wisdom"]-10)/2);
        data["int"] = parseInt((data["intelligence"]-10)/2);
        data["prof"] = 3;
        data["ability"] = data[classData.abilityScaling] || 0;
        data["level"] = 8;
        return data;
    }
}
