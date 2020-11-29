export const LEVEL = 8;

export const CLASS_DATA = {
    "Artificer": {
        scores: {
            "strength": 16,
            "dexterity": 10,
            "constitution": 14,
            "intelligence": 20,
            "wisdom": 12,
            "charisma": 10
        },
        saveProficiencies: ["con", "int"],
        trainedSkills: ["arcana", "history", "investigation", "insight"],
        abilityScaling: "int",
        hp: 8 + (LEVEL-1) * 5,
        mana: 10,
        ac: 20
    },
    "Barbarian": {
        scores: {
            "strength": 20,
            "dexterity": 14,
            "constitution": 16,
            "intelligence": 10,
            "wisdom": 12,
            "charisma": 10
        },
        saveProficiencies: ["str", "con"],
        trainedSkills: ["intimidation", "athletics", "nature", "survival"],
        hp: 12 + (LEVEL-1) * 7,
        mana: 2,
        ac: 15
    },
    "Bard": {
        scores: {
            "strength": 10,
            "dexterity": 16,
            "constitution": 10,
            "intelligence": 14,
            "wisdom": 12,
            "charisma": 20
        },
        saveProficiencies: ["dex", "cha"],
        trainedSkills: ["persuasion", "performance", "deception", "history", "acrobatics", "intimidation"],
        abilityScaling: "cha",
        hp: 8 + (LEVEL-1) * 5,
        mana: 27,
        ac: 15
    },
    "Cleric": {
        scores: {
            "strength": 16,
            "dexterity": 10,
            "constitution": 14,
            "intelligence": 10,
            "wisdom": 20,
            "charisma": 12
        },
        saveProficiencies: ["wis", "cha"],
        trainedSkills: ["religion", "medicine", "insight", "persuasion"],
        abilityScaling: "wis",
        hp: 8 + (LEVEL-1) * 5,
        mana: 27,
        ac: 20
    },
    "Druid": {
        scores: {
            "strength": 10,
            "dexterity": 10,
            "constitution": 14,
            "intelligence": 12,
            "wisdom": 20,
            "charisma": 16
        },
        saveProficiencies: ["int", "wis"],
        trainedSkills: ["animals", "nature", "survival", "medicine"],
        abilityScaling: "wis",
        hp: 8 + (LEVEL-1) * 5,
        mana: 27,
        ac: 11
    },
    "Fighter": {
        scores: {
            "strength": 20,
            "dexterity": 14,
            "constitution": 16,
            "intelligence": 10,
            "wisdom": 10,
            "charisma": 12
        },
        saveProficiencies: ["str", "con"],
        trainedSkills: ["athletics", "insight", "intimidation", "perception"],
        hp: 10 + (LEVEL-1) * 6,
        mana: 2,
        ac: 19
    },
    "Monk": {
        scores: {
            "strength": 14,
            "dexterity": 20,
            "constitution": 12,
            "intelligence": 10,
            "wisdom": 16,
            "charisma": 10
        },
        saveProficiencies: ["str", "dex"],
        trainedSkills: ["acrobatics", "perception", "insight", "stealth"],
        hp: 8 + (LEVEL-1) * 5,
        mana: 10,
        ac: 18
    },
    "Paladin": {
        scores: {
            "strength": 14,
            "dexterity": 10,
            "constitution": 20,
            "intelligence": 10,
            "wisdom": 12,
            "charisma": 16
        },
        saveProficiencies: ["wis", "cha"],
        trainedSkills: ["insight", "religion", "investigation", "athletics"],
        abilityScaling: "cha",
        hp: 10 + (LEVEL-1) * 6,
        mana: 10,
        ac: 20
    },
    "Ranger": {
        scores: {
            "strength": 10,
            "dexterity": 20,
            "constitution": 10,
            "intelligence": 14,
            "wisdom": 16,
            "charisma": 12
        },
        saveProficiencies: ["str", "dex"],
        trainedSkills: ["animals", "survival", "nature", "perception"],
        abilityScaling: "wis",
        hp: 10 + (LEVEL-1) * 6,
        mana: 10,
        ac: 17
    },
    "Rogue": {
        scores: {
            "strength": 10,
            "dexterity": 20,
            "constitution": 10,
            "intelligence": 12,
            "wisdom": 16,
            "charisma": 14
        },
        saveProficiencies: ["dex", "int"],
        trainedSkills: ["sleight", "stealth", "acrobatics", "athletics"],
        hp: 8 + (LEVEL-1) * 5,
        mana: 2,
        ac: 17
    },
    "Sorcerer": {
        scores: {
            "strength": 10,
            "dexterity": 10,
            "constitution": 16,
            "intelligence": 14,
            "wisdom": 12,
            "charisma": 20
        },
        saveProficiencies: ["cha", "con"],
        trainedSkills: ["intimidation", "history", "ceception", "insight"],
        abilityScaling: "cha",
        hp: 6 + (LEVEL-1) * 4,
        mana: 27,
        ac: 10
    },
    "Warlock": {
        scores: {
            "strength": 10,
            "dexterity": 16,
            "constitution": 12,
            "intelligence": 10,
            "wisdom": 14,
            "charisma": 20
        },
        saveProficiencies: ["wis", "cha"],
        trainedSkills: ["arcana", "deception", "nature", "investigation"],
        abilityScaling: "cha",
        hp: 8 + (LEVEL-1) * 5,
        mana: 10,
        ac: 15
    },
    "Wizard": {
        scores: {
            "strength": 10,
            "dexterity": 16,
            "constitution": 10,
            "intelligence": 20,
            "wisdom": 14,
            "charisma": 12
        },
        saveProficiencies: ["int", "wis"],
        trainedSkills: ["arcana", "history", "insight", "medicine"],
        abilityScaling: "int",
        hp: 6 + (LEVEL-1) * 4,
        mana: 27,
        ac: 10
    }
};
