const Classes: { [key: string]: Class } = {};

import Agent from "./Classes/Agent";
import Godsworn from "./Classes/Godsworn";
import Evoker from "./Classes/Evoker";

// Helper function to add classes from an object to Classes
function AddClass(characterClass: Class) {
    Classes[characterClass.Name] = characterClass;
}

// Add all classes
AddClass(Agent);
AddClass(Godsworn);
AddClass(Evoker);

//AddClass(Captain);
//AddClass(Demonologist);

export default Classes;
