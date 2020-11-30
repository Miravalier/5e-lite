import {CLASS_DATA} from "./constants.js";
import {raceItems, classItems} from "./item.js";
import {sendTemplate, chatTemplateHeader, chatTemplateRow} from "./chat.js";


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

        // Set AC
        data_updates["data.ac"] = classData.ac;

        // Set mana
        data_updates["data.mana.value"] = classData.mana;
        data_updates["data.mana.max"] = classData.mana;

        // Set HP
        const con_modifier = (classData.scores["constitution"] - 10) / 2;
        const starting_hp = classData.hp + (con_modifier * 8);
        data_updates["data.hp.value"] = starting_hp;
        data_updates["data.hp.max"] = starting_hp;

        // Set race stats such as regular, flying, and swimming speeds
        data_updates["data.speed"] = 30;
        if (race === "Aarakocra") {
            data_updates["data.speed"] = 25;
            data_updates["data.flying_speed"] = 50;
        }
        else if (race === "Triton") {
            data_updates["data.swimming_speed"] = 35;
        }
        else if (race === "Halfling") {
            data_updates["data.size"] = "Small";
            data_updates["data.speed"] = 25;
        }
        else if (race === "Dwarf" || race === "Gnome") {
            data_updates["data.speed"] = 25;
        }
        else if (race === "Leonin" || race === "Satyr") {
            data_updates["data.speed"] = 35;
        }
        else if (race === "Centaur") {
            data_updates["data.size"] = "Large";
            data_updates["data.speed"] = 40;
        }

        // Set trained skills
        classData.trainedSkills.forEach(skill => {
            data_updates[`data.skills.${skill}.prof`] = true;
        });

        // If bard or rogue, add expertise
        if (cls === "bard" || cls === "rogue")
        {
            classData.trainedSkills.forEach(skill => {
                data_updates[`data.skills.${skill}.value`] = 3;
            });
        }

        // Add new race and class items
        for (let item of raceItems(race)) {
            await this.createOwnedItem(item);
        }

        for (let item of classItems(cls)) {
            await this.createOwnedItem(item);
        }

        // Perform mass update
        data_updates["data.ready"] = true;
        data_updates["data.locked_in"] = true;
        this.update(data_updates);
    }

    /** @override */
    getRollData() {
        const data = super.getRollData();
        data["str"] = parseInt((data["strength"]-10)/2);
        data["dex"] = parseInt((data["dexterity"]-10)/2);
        data["con"] = parseInt((data["constitution"]-10)/2);
        data["cha"] = parseInt((data["charisma"]-10)/2);
        data["wis"] = parseInt((data["wisdom"]-10)/2);
        data["int"] = parseInt((data["intelligence"]-10)/2);
        data["prof"] = 3;
        data["level"] = 8;

        data["init"] = data["initiative"] + data["dex"];

        data["str_save"] = data["str"];
        data["dex_save"] = data["dex"];
        data["con_save"] = data["con"];
        data["cha_save"] = data["cha"];
        data["wis_save"] = data["wis"];
        data["int_save"] = data["int"];

        const classData = CLASS_DATA[data["class"]];
        if (classData) {
            data["ability"] = data[classData.abilityScaling] || 0;
            classData.saveProficiencies.forEach(stat => {
                data[stat + "_save"] = data[stat] + data["prof"];
            });
        }

        return data;
    }


    roll(label, formula) {
        const rollData = this.getRollData();
        sendTemplate(`
            ${chatTemplateHeader(this)}
            ${chatTemplateRow(label, formula, rollData)}
        `);
    }
}
