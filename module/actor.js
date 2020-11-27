/**
 * @extends {Actor}
 */
export class DndActor extends Actor {
  /** @override */
  prepareData() {
    super.prepareData();
  }


  /** @override */
  getRollData() {
    const data = super.getRollData();
    data["str"] = parseInt((data["strength"]-10)/2);
    data["dex"] = parseInt((data["dexterity"]-10)/2);
    data["con"] = parseInt((data["constitution"]-10)/2);
    data["cha"] = parseInt((data["charisma"]-10)/2);
    data["wis"] = parseInt((data["wisdom"]-10)/2);
    data["int"] = parseInt((data["intelligence"]-10)/2);
    data["prof"] = 3;
    return data;
  }
}
