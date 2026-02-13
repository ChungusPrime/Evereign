const ProficiencyData: { [key: string]: Proficiency } = {};

import Demolitionist from "./Proficiencies/Demolitionist";
import Scattergunner from "./Proficiencies/Scattergunner";
import Pyromancer from "./Proficiencies/Pyromancer";
import Cryomancer from "./Proficiencies/Cryomancer";
import Gadgeteer from "./Proficiencies/Gadgeteer";

// Helper function to add abilities from an object to AbilityData
function AddProficiency(proficiency: Proficiency) {
    ProficiencyData[proficiency.ID] = proficiency;
}

// Add all abilities
AddProficiency(Demolitionist);
AddProficiency(Scattergunner);
AddProficiency(Pyromancer);
AddProficiency(Cryomancer);
AddProficiency(Gadgeteer);

export default ProficiencyData;