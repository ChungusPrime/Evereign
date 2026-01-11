import ScipiusDialogue from "./NPCs/ScipiusBogtrotter";
import JournalEntries from "./Lore/JournalEntries";
import GeneralLore from "./Lore/General";

const DialogueData: { [key: string]: DialogueData } = {
    "Journal Entries": JournalEntries,
    "Scipius Bogtrotter": ScipiusDialogue,
    "Lore": GeneralLore
};

export default DialogueData;