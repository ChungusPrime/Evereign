const Proficiencies: { [key: string]: Proficiency } = {};

import Explosives from "./Proficiencies/Explosives";
import Scatterguns from "./Proficiencies/Scatterguns";
import Pyromancy from "./Proficiencies/Pyromancy";
import Cryomancy from "./Proficiencies/Cryomancy";
import Gadgets from "./Proficiencies/Gadgets";

// Helper function to add abilities from an object to AbilityData
function AddProficiency(proficiency: Proficiency) {
    Proficiencies[proficiency.ID] = proficiency;
}

// Add all abilities
AddProficiency(Explosives);
AddProficiency(Scatterguns);
AddProficiency(Pyromancy);
AddProficiency(Cryomancy);
AddProficiency(Gadgets);

export default Proficiencies;