import { Willowvale } from "./Willowvale";
import { Willowvale_Caverns } from "./Willowvale_Caverns";
import { WillowvaleNorth } from "./Willowvale_North";

const TheMidnightAccord: Campaign = {
    
    ID: "The Midnight Accord",
    Name: "The Midnight Accord",
    Description: `In the ancient and verdant realm of Arlamore, peace and prosperity have long been the pillars of the kingdom. Ruled by the wise and noble King Arlamore, 
    the land has flourished under his just and benevolent reign. However, in the shadows of this thriving kingdom, dark forces have begun to stir.

    You are a sage and loyal adviser to the king and have served Arlamore with unwavering dedication. One night, a vision, vivid and harrowing, invaded your dreams. 
    This vision, unlike any he had experienced before, showed a future where Arlamore lay in ruins, its people suffering under the yoke of unending calamity.
    
    The king, though wise, dismissed your vision as a mere nightmare, a product of stress and overwork. Desperate and determined, you took matters into your own hands
    and decided to embark on a perilous journey to gather allies and warn the people of impending doom.`,

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
            Resources: ["Iron Deposit", "Stone Deposit", "Oak Tree", "Marigold", "Humming Bass", "River Tomato"],
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

    WorldData: {
        Willowvale: Willowvale,
        WillowvaleCaverns: Willowvale_Caverns,
        WillowvaleNorth: WillowvaleNorth
    },
    
    // Default persistant world data, used to keep track of player actions and progression
    //DefaultWorldData: {}

}

// Take the InitialData values of each object and assign them to the same key in the DefaultWorldData object
/*function SetupDynamicWorldData () {
    Object.keys(TheMidnightAccord.WorldData).forEach((campaign) => {
        TheMidnightAccord.DefaultWorldData[campaign] = {};
        Object.keys(TheMidnightAccord.WorldData[campaign]).forEach((data) => {
            TheMidnightAccord.DefaultWorldData[campaign][data] = { ...TheMidnightAccord.WorldData[campaign][data].InitialData };
        });
    });
}
    
SetupDynamicWorldData();*/

export default TheMidnightAccord;