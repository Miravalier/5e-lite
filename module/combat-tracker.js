import { TurnUpdateMessage, RoundUpdateMessage } from "./chat.js";

function pointDistance(x1, y1, x2, y2)
{
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function pingCombatant()
{
    if (!game.combat || !game.combat.combatant) return;

    const combat = game.combat;
    const actor = combat.combatant.actor;
    const token = actor.getActiveTokens().find(t => t.id === combat.combatant.token._id);
    if (token) {
        token.setTarget(true);
        setTimeout(() => {
            token.setTarget(false);
        }, 2500);
    }
}

function roundAdvance(combat, round)
{
    RoundUpdateMessage(round);
}

function turnAdvance(combat, turn)
{
    TurnUpdateMessage(combat.combatant.name, "Turn Start");
}

export function onUpdateCombat(combat, update, options, userId)
{
    console.log(combat.current.round, combat.current.turn);
    console.log(update);
    if (!game.user.isGM) return;
    if (!combat.combatant) return;

    pingCombatant();

    if (update.round)
    {
        roundAdvance(combat, update.round);
        turnAdvance(combat, update.turn);
    }
    else
    {
        turnAdvance(combat, update.turn);
    }

}
