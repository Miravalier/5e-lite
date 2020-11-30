/**
 * 5E-Lite ruleset.
 * Author: Miravalier
 * Software License: GNU GPLv3
 */

// Import Modules
import { DndActor } from "./actor.js";
import { DndItem } from "./item.js";

import {
    ActiveAbilitySheet,
    PassiveAbilitySheet,
    ConsumableSheet,
    MiscSheet
} from "./item-sheet.js";
import { DndCharacterSheet, DndNpcSheet } from "./actor-sheet.js";

import {
    onRenderChatMessage,
    onRenderChatLog,
    onChatExport,
    preChatMessage,
    ErrorMessage
} from "./chat.js";

import {
    preCreateItem,
    preCreateOwnedItem,
    preCreateActor,
    preCreateToken
} from "./create-defaults.js";

import {
    onUpdateCombat
} from "./combat-tracker.js";


/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
    console.log(`Initializing 5E-Lite ruleset.`);

    // CONFIG.debug.hooks = true;

    CONFIG.Combat.initiative = {
        formula: "1d20+@init + (@dexterity/100)",
        decimals: 2
    };

    game.dnd = {
        ActorMacro,
        OwnedItemMacro,
        ItemMacro,
        SetNPCNames,
        ErrorMessage,
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
    Items.registerSheet("dnd", ActiveAbilitySheet, { makeDefault: true });
    Items.registerSheet("dnd", PassiveAbilitySheet, { makeDefault: true });
    Items.registerSheet("dnd", ConsumableSheet, { makeDefault: true });
    Items.registerSheet("dnd", MiscSheet, { makeDefault: true });

    // Register handlebars helpers.
    Handlebars.registerHelper('ifeq', function (a, b, options) {
        if (a == b) { return options.fn(this); }
        return options.inverse(this);
    });

    Handlebars.registerHelper('ifnoteq', function (a, b, options) {
        if (a != b) { return options.fn(this); }
        return options.inverse(this);
    });

    Hooks.on("renderChatLog", (app, html, data) => onRenderChatLog(html));
    Hooks.on("renderChatMessage", (app, html, data) => onRenderChatMessage(html));
});

Hooks.once("ready", function() {
    Hooks.on("updateCombat", onUpdateCombat);
    Hooks.on("chatMessage", preChatMessage);
    Hooks.on("preCreateItem", preCreateItem);
    Hooks.on("preCreateOwnedItem", preCreateOwnedItem);
    Hooks.on("preCreateActor", preCreateActor);
    Hooks.on("preCreateToken", preCreateToken);
    Hooks.on("hotbarDrop", createMacro);
    Messages.prototype.export = onChatExport;
});

// Macros
async function createMacro(bar, data, slot) {
    let command = "";
    let source = null;
    if (data.type === "Item")
    {
        if (data.actorId) {
            command = `game.dnd.OwnedItemMacro("${data.actorId}", "${data.data._id}");`;
            source = game.actors.get(data.actorId).getOwnedItem(data.data._id);
        }
        else {
            command = `game.dnd.ItemMacro("${data.id}");`;
            source = game.items.get(data.id);
        }
    }
    else if (data.type === "Actor")
    {
        command = `game.dnd.ActorMacro("${data.id}");`;
        source = game.actors.get(data.id);
    }
    else
    {
        throw "Invalid macro drop source.";
    }

    let macro = game.macros.entities.find(m => (m.data.command === command));
    if (!macro) {
        macro = await Macro.create({
            name: source.name,
            type: "script",
            img: source.img,
            command: command
        });
    }

    game.user.assignHotbarMacro(macro, slot);
}

function ActorMacro(actor_id)
{
    try {
        game.actors.get(actor_id).sheet.render(true);
    }
    catch {
        console.error("The actor this macro references no longer exists.");
    }
}

function ItemMacro(item_id)
{
    try {
        game.items.get(item_id).use()
    }
    catch {
        console.error("The item this macro references no longer exists.");
    }
}

function OwnedItemMacro(actor_id, item_id)
{
    try {
        game.actors.get(actor_id).getOwnedItem(item_id).use();
    }
    catch {
        console.error("Either the actor or item this macro references no longer exist.");
    }
}

function SetNPCNames()
{
    const originals = {};
    const counts = {};
    const updates = {};
    canvas.tokens.ownedTokens.filter(t => t.actor.data.type === "NPC").forEach(token => {
        let i = counts[token.actor.name];
        if (!i) {
            i = 1;
            originals[token.actor.name] = token;
            updates[token.id] = token.actor.name;
        }
        else {
            updates[token.id] = token.actor.name + " " + i;
        }
        if (i == 2) {
            updates[originals[token.actor.name].id] = token.actor.name + " 1";
        }
        counts[token.actor.name] = i + 1;
    });
    for (const [key, value] of Object.entries(updates))
    {
        canvas.tokens.get(key).update({name: value});
    }
}
