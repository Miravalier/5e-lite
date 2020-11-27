export function preCreateItem(data, options, userId)
{
    if (data.type == "Active Ability")
    {
        data.img = "systems/5e-lite/images/unknown-active.png";
    }
    else if (data.type == "Consumable")
    {
        data.img = "systems/5e-lite/images/unknown-consumable.png";
    }
    else if (data.type == "Passive Ability")
    {
        data.img = "systems/5e-lite/images/unknown-passive.png";
    }
    else if (data.type == "Weapon")
    {
        data.img = "systems/5e-lite/images/unknown-weapon.png";
    }
    else
    {
        data.img = "systems/5e-lite/images/unknown-misc.png";
    }
}

export function preCreateOwnedItem(actor, data, options, userId)
{
    if (!data.img)
    {
        if (data.type == "Active Ability")
        {
            data.img = "systems/5e-lite/images/unknown-active.png";
        }
        else if (data.type == "Consumable")
        {
            data.img = "systems/5e-lite/images/unknown-consumable.png";
        }
        else if (data.type == "Passive Ability")
        {
            data.img = "systems/5e-lite/images/unknown-passive.png";
        }
        else if (data.type == "Weapon")
        {
            data.img = "systems/5e-lite/images/unknown-weapon.png";
        }
        else
        {
            data.img = "systems/5e-lite/images/unknown-misc.png";
        }
    }
}

export function preCreateActor(data, options, userId)
{
    data.img = "Players/default_image.svg";
}

export function preCreateToken(scene, data, options, userId)
{
    const actor = game.actors.get(data.actorId);

    data.name = actor.name;
    data.img = actor.img;
    data.bar1 = {attribute: "hp"};
    data.bar2 = {attribute: "mana"};

    data.lightAlpha = 1;
    data.lightAngle = 360;
    data.lightColor = "#fffbe0";

    data.brightLight = 0;
    data.brightSight = 100;
    data.dimLight = 0;
    data.dimSight = 100;

    if (actor.data.type === "Character")
    {
        data.actorLink = true;
        data.displayBars = 30;
        data.displayName = 30;
        data.disposition = 1;
        data.vision = true;
    }
    else if (actor.data.type === "NPC")
    {
        data.actorLink = false;
        data.displayBars = 20;
        data.displayName = 30;
        data.disposition = -1;
        data.vision = false;
    }
}
