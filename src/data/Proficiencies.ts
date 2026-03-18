const Proficiencies: { [key: string]: Proficiency } = {};

import Explosives from "./Proficiencies/Explosives";
import Scatterguns from "./Proficiencies/Scatterguns";
import Pyromancy from "./Proficiencies/Pyromancy";
import Cryomancy from "./Proficiencies/Cryomancy";
import Gadgets from "./Proficiencies/Gadgets";
import Crossbows from "./Proficiencies/Crossbows";
import Swords from "./Proficiencies/Swords";
import Hammers from "./Proficiencies/Hammers";

// Helper function to add abilities from an object to AbilityData
function AddProficiency(proficiency: Proficiency) {
    Proficiencies[proficiency.Name] = proficiency;
}

// Add all abilities
AddProficiency(Explosives);
AddProficiency(Scatterguns);
AddProficiency(Pyromancy);
AddProficiency(Cryomancy);
AddProficiency(Gadgets);
AddProficiency(Crossbows);
AddProficiency(Swords);
AddProficiency(Hammers);

export default Proficiencies;