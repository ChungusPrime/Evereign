import { TutorsIsland } from "./TutorsIsland";

const Tutorial: Campaign = {
    
    ID: "Tutorial",
    Name: "Tutorial",
    Description: `The perfect place to learn the basics of Evereign. Explore a serene island, gather resources, learn to fight and build your first town in this tranquil setting.`,

    // The starting map and coordinates for the player
    StartingMap: "Tutors Island",
    StartingX: 6222,
    StartingY: 12136,

    WorldMapInformation: {
        "Tutors Island": {
            Name: "Tutors Island",
            Description: "An island dedicated to teaching new adventurers the ways of Evereign.",
            Image: "tutors_island_map.png",
            Size: { Width: 6000, Height: 4000 },
            MapName: "Tutors Island",
            Type: "Exterior",
            Resources: ["Iron Deposit", "Stone Deposit", "Oak Tree", "Marigold", "Humming Bass", "River Tomato"],
            Music: "theme",
        },
    },

    WorldData: {
        "Tutors Island": TutorsIsland,
    },

}

export default Tutorial;