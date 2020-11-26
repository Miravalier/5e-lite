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

export function preCreateToken(data, options, userId)
{
}
