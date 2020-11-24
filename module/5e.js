/**
 * 5E-Lite ruleset.
 * Author: Miravalier
 * Software License: GNU GPLv3
 */

// Import Modules
import { DndActor } from "./actor.js";
import { DndItem } from "./item.js";
import { DndItemSheet } from "./item-sheet.js";
import { DndCharacterSheet, DndNpcSheet } from "./actor-sheet.js";

import { onCreateChatMessage } from "./chat.js";
import { onChatExport } from "./chat.js";
import { preChatMessage } from "./chat.js";
import { ErrorMessage } from "./chat.js";

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
        emoji: {
        }
    };

    // Define custom Entity classes
    CONFIG.Actor.entityClass = DndActor;
    CONFIG.Item.entityClass = DndItem;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("dnd", DndCharacterSheet, { makeDefault: true });
    Actors.registerSheet("dnd", DndNpcSheet, { makeDefault: true });
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("dnd", DndItemSheet, { makeDefault: true });

    // Register handlebars helpers.
    /**
        Handlebars.registerHelper('name', function(value) {
            return value;
        });
    */
});

Hooks.once("ready", function() {
    Hooks.on("renderChatMessage", (app, html, data) => onCreateChatMessage(html, data));
    Hooks.on("chatMessage", (chatLog, message, chatData) => preChatMessage(chatLog, message, chatData));
    Messages.prototype.export = onChatExport;
});
