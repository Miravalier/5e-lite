/**
 * @extends {Item}
 */
export class DndItem extends Item {
    /** @override */
    prepareData() {
        super.prepareData();
    }


    /** @override */
    getRollData() {
        const data = super.getRollData();
        return data;
    }

    // Item use for any item.
    use() {
        if (this.type == "Active Ability")
        {
            if (this.actor)
            {
                this.ownedActiveAbilityUse();
            }
            else
            {
                this.activeAbilityUse();
            }
        }
        else if (this.type == "Weapon")
        {
            if (this.actor)
            {
                this.ownedWeaponUse();
            }
            else
            {
                this.weaponUse();
            }
        }
        else if (this.type == "Passive Ability")
        {
            this.passiveUse();
        }
        else if (this.type == "Miscellaneous")
        {
            this.miscUse();
        }
        else if (this.type == "Consumable")
        {
            this.consumableUse();
        }
    }


    // Specific use functions for each item type
    activeAbilityUse() {
    }

    ownedActiveAbilityUse() {
    }

    weaponUse() {
    }

    ownedWeaponUse() {
    }

    miscUse() {
    }

    passiveUse() {
    }

    consumableUse() {
    }
}
