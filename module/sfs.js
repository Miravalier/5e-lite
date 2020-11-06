/**
 * SFS ruleset.
 * Author: Miravalier
 * Software License: GNU GPLv3
 */

// Import Modules
import { SfsActor } from "./actor.js";
import { SfsItem } from "./item.js";
import { SfsItemSheet } from "./item-sheet.js";
import { SfsCharacterActorSheet, SfsNpcActorSheet } from "./actor-sheet.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
    console.log(`Initializing SFS ruleset.`);

    CONFIG.Combat.initiative = {
        formula: "1d20",
        decimals: 0
    };

    game.sfs = {

    };

    // Define custom Entity classes
    CONFIG.Actor.entityClass = SfsActor;
    CONFIG.Item.entityClass = SfsItem;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("sfs", SfsCharacterActorSheet, { makeDefault: true });
    Actors.registerSheet("sfs", SfsNpcActorSheet, { makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("sfs", SfsItemSheet, { makeDefault: true });

    // Register handlebars helpers.
    /**
        Handlebars.registerHelper('name', function(value) {
            return value;
        });
    */
});
