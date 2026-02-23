const RaceData: { [key: string]: Race } = {};

import Drakonid from "./Races/Drakonid";
import Dwarf from "./Races/Dwarf";
import Elf from "./Races/Elf";
import Gnome from "./Races/Gnome";
import Human from "./Races/Human";
import Kirupean from "./Races/Kirupean";
import Morvenite from "./Races/Morvenite";
import Protostruct from "./Races/Protostruct";
import Thogac from "./Races/Thogac";
import Tiseri from "./Races/Tiseri";

// Helper function to add classes from an object to ClassData
function AddRace(race: Race) {
    RaceData[race.Name] = race;
}

// Add all classes
AddRace(Drakonid);
AddRace(Dwarf);
AddRace(Elf);
AddRace(Gnome);
AddRace(Human);
AddRace(Kirupean);
AddRace(Morvenite);
AddRace(Protostruct);
AddRace(Thogac);
AddRace(Tiseri);

export default RaceData;