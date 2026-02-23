const ClassData: { [key: string]: Class } = {};

import Agent from "./Classes/Agent";
import Godsworn from "./Classes/Godsworn";
import Evoker from "./Classes/Evoker";

// Helper function to add classes from an object to ClassData
function AddClass(characterClass: Class) {
    ClassData[characterClass.Name] = characterClass;
}

// Add all classes
AddClass(Agent);
AddClass(Godsworn);
AddClass(Evoker);

//AddClass(Captain);
//AddClass(Demonologist);

export default ClassData;
