import Proficiencies from "./Proficiencies";

const Traits: { [key: string]: Trait } = {};

Object.entries(Proficiencies).forEach( ([key, proficiency]) => {

    proficiency.Traits.forEach( trait => {
        Traits[trait.ID] = trait;
    });

});

export default Traits;