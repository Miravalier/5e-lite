/**
 * 5E-Lite ruleset.
 * Author: Miravalier
 * Software License: GNU GPLv3
 */

// Import Modules
import { DndActor } from "./actor.js";
import { DndItem } from "./item.js";
import { DndItemSheet } from "./item-sheet.js";
import { DndCharacterActorSheet, DndNpcActorSheet } from "./actor-sheet.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
    console.log(`Initializing 5E-Lite ruleset.`);

    CONFIG.Combat.initiative = {
        formula: "1d20",
        decimals: 0
    };

    game.dnd = {

    };

    // Define custom Entity classes
    CONFIG.Actor.entityClass = DndActor;
    CONFIG.Item.entityClass = DndItem;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("dnd", DndCharacterActorSheet, { makeDefault: true });
    Actors.registerSheet("dnd", DndNpcActorSheet, { makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("dnd", DndItemSheet, { makeDefault: true });

    // Register handlebars helpers.
    /**
        Handlebars.registerHelper('name', function(value) {
            return value;
        });
    */
});
