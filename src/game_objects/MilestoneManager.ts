export default class MilestoneManager {

    public Milestones: MilestoneItem[] = [
        {
            ID: 1,
            Name: "First Steps",
            Description: "Build the town centre",
            Unlocked: false
        },
        {
            ID: 2,
            Name: "Industry",
            Description: "Build one of the following: Logging Camp, Mine or Farm",
            Unlocked: false
        },
        {
            ID: 3,
            Name: "Logistics",
            Description: "Build a warehouse",
            Unlocked: false
        },
        {
            ID: 4,
            Name: "Income",
            Description: "Earn 500 gold by selling goods to Little Piddleton",
            Unlocked: false
        },
        {
            ID: 5,
            Name: "Idle Hands",
            Description: "Hire one character and assign them to work in your town",
            Unlocked: false
        },
    ];

    constructor() {
        
    }

    UnlockMilestone ( ID: number ) {
        const milestone = this.Milestones.find( (m) => m.ID = ID );
        if ( milestone ) {
            milestone.Unlocked = true;
        }
    }

}