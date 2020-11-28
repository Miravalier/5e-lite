export const LEVEL = 8;

export const CLASS_DATA = {
    "Artificer": {
        scores: {
            "strength": 14,
            "dexterity": 10,
            "constitution": 16,
            "intelligence": 20,
            "wisdom": 12,
            "charisma": 10
        },
        abilityScaling: "int",
        hp: 8 + (LEVEL-1) * 5
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
        hp: 12 + (LEVEL-1) * 7
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
        abilityScaling: "cha",
        hp: 8 + (LEVEL-1) * 5
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
        abilityScaling: "wis",
        hp: 8 + (LEVEL-1) * 5
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
        abilityScaling: "wis",
        hp: 8 + (LEVEL-1) * 5
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
        hp: 10 + (LEVEL-1) * 6
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
        hp: 8 + (LEVEL-1) * 5
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
        abilityScaling: "cha",
        hp: 10 + (LEVEL-1) * 6
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
        abilityScaling: "wis",
        hp: 10 + (LEVEL-1) * 6
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
        hp: 8 + (LEVEL-1) * 5
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
        abilityScaling: "cha",
        hp: 6 + (LEVEL-1) * 4
    },
    "Warlock": {
        scores: {
            "strength": 16,
            "dexterity": 14,
            "constitution": 12,
            "intelligence": 10,
            "wisdom": 10,
            "charisma": 20
        },
        abilityScaling: "cha",
        hp: 8 + (LEVEL-1) * 5
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
        abilityScaling: "int",
        hp: 6 + (LEVEL-1) * 4
    }
};
