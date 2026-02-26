const Races: { [key: string]: Race } = {};

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

// Helper function to add races from an object to Races
function AddRace(race: Race) {
    Races[race.Name] = race;
}

// Add all races
AddRace(Human);
AddRace(Drakonid);
AddRace(Dwarf);
AddRace(Elf);
AddRace(Gnome);
AddRace(Kirupean);
AddRace(Morvenite);
AddRace(Protostruct);
AddRace(Thogac);
AddRace(Tiseri);

export default Races;