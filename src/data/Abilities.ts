import Proficiencies from "./Proficiencies";

const Abilities: { [key: string]: Ability } = {};

Object.entries(Proficiencies).forEach( ([key, proficiency]) => {

    proficiency.Abilities.forEach( ability => {
        Abilities[ability.ID] = ability;
    });

});

export default Abilities;