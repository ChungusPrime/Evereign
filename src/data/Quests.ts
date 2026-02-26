import ToLittlePiddleton from "./Quests/ToLittlePiddleton";
import ToWindyRidge from "./Quests/ToWindyRidge";
import TheSource from "./Quests/TheSource";
import TheGobboMenace from "./Quests/TheGobboMenace";
import WarchiefGorgutz from "./Quests/WarchiefGorgutz";
import TheGreatGobboTree from "./Quests/TheGreatGobboTree";
import UncoveringMarXanthir from "./Quests/UncoveringMarXanthir";

interface Quests {
    [key: string]: QuestData;
}

const QuestData: Quests = {
    [ToLittlePiddleton.ID]: ToLittlePiddleton,
    /*[ToWindyRidge.ID]: ToWindyRidge,
    [TheSource.ID]: TheSource,
    [TheGobboMenace.ID]: TheGobboMenace,
    [WarchiefGorgutz.ID]: WarchiefGorgutz,
    [TheGreatGobboTree.ID]: TheGreatGobboTree,
    [UncoveringMarXanthir.ID]: UncoveringMarXanthir*/
};

export default QuestData;