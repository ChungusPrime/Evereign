const SkillData: { [key: string]: Skill } = {};

import Alchemy from "./Skills/Alchemy";
import Botany from "./Skills/Botany";
import Cooking from "./Skills/Cooking";
import Fishing from "./Skills/Fishing";
import Forestry from "./Skills/Forestry";
import Mining from "./Skills/Mining";
import Security from "./Skills/Security";

function AddSkill(skill: Skill) {
    SkillData[skill.Name] = skill;
}

AddSkill(Alchemy);
AddSkill(Botany);
AddSkill(Cooking);
AddSkill(Fishing);
AddSkill(Forestry);
AddSkill(Mining);
AddSkill(Security);

export default SkillData;