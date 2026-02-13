const AbilityData: { [key: string]: Ability } = {};

import ExplosivesAbilities from "./Abilities/Explosives";
import ScattergunAbilities from "./Abilities/Scattergun";

// Helper function to add abilities from an object to AbilityData
function AddAbilities(abilities: Ability[]) {
    abilities.forEach(ability => {
        AbilityData[ability.id] = ability;
    });
}

// Add all abilities
AddAbilities(ExplosivesAbilities);
AddAbilities(ScattergunAbilities);

/*import Gadgetry from "./Abilities/Gadgetry";
// Turrets
// Constructs
// */

//import Pyro from "./Abilities/Pyro";
//import Cryo from "./Abilities/Cryo";


