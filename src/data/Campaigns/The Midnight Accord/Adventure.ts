import { Willowvale } from "./Willowvale";
import { Willowvale_Default } from "./Willowvale_Default";

import { Willowvale_Caverns } from "./Willowvale_Caverns";
import { Willowvale_Caverns_Default } from "./Willowvale_Caverns_Default";

import { WillowvaleNorth } from "./Willowvale_North";
import { WillowvaleNorthDefault } from "./Willowvale_North_Default";

const Adventure: Campaign = {
    
    ID: "The Midnight Accord",
    Name: "The Midnight Accord",
    Description: "Embark on a journey through the mystical lands of Willowvale, exploring caverns and uncovering secrets.",

    // The starting map and coordinates for the player
    StartingMap: "Willowvale",
    StartingX: 6333,
    StartingY: 5692,

    WorldMapInformation: {
        Willowvale: {
            Name: "Willowvale",
            Description: "A serene valley filled with lush greenery and hidden secrets.",
            Image: "willowvale_map.png",
            Size: { Width: 8000, Height: 6000 },
            MapName: "Willowvale",
            Type: "Exterior",
            Resources: ["Iron", "Stone", "Oak", "Marigold", "Humming Bass", "River Tomato"],
            Music: "theme",
        },
        WillowvaleCaverns: {
            Name: "Willowvale Caverns",
            Description: "Dark and mysterious caverns beneath Willowvale, home to ancient creatures.",
            Image: "willowvale_caverns_map.png",
            Size: { Width: 4000, Height: 3000 },
            MapName: "Willowvale Caverns",
            Type: "Interior",
            Music: "theme",
            Resources: ["Iron", "Stone", "Oak", "Marigold", "Humming Bass", "River Tomato"],
        },
        WillowvaleNorth: {
            Name: "Willowvale North",
            Description: "The northern region of Willowvale, known for its rugged terrain and hidden treasures.",
            Image: "willowvale_north_map.png",
            Size: { Width: 5000, Height: 4000 },
            MapName: "Willowvale North",
            Type: "Exterior",
            Music: "theme",
            Resources: ["Iron", "Stone", "Oak", "Marigold", "Humming Bass", "River Tomato"],
        }
    },
    
    // Static map data, not changed by player actions, used as a reference
    WorldData: {
        Willowvale: Willowvale,
        WillowvaleCaverns: Willowvale_Caverns,
        WillowvaleNorth: WillowvaleNorth
    },
    
    // Default persistant world data, used to keep track of player actions and progression
    DefaultWorldData: {
        Willowvale: Willowvale_Default,
        WillowvaleCaverns: Willowvale_Caverns_Default,
        WillowvaleNorth: WillowvaleNorthDefault
    }
    
}

export default Adventure;