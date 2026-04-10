import { Willowvale } from "./Willowvale";
import { WillowvaleCaverns } from "./WillowvaleCaverns";
import { WillowvaleNorth } from "./WillowvaleNorth";

const TheMidnightAccord: Campaign = {
    
    ID: "The Midnight Accord",
    Name: "The Midnight Accord",
    Description: `In the ancient and verdant Briarmourn, peace and prosperity have long been the pillars upheld by the people of this land. Ruled by the wise and noble King Tharos, the land has flourished under his just and benevolent reign. 
    
    However, in the shadows of this thriving kingdom, dark forces have begun to stir.

    You are a loyal adviser to the king and have served Briarmourn with unwavering dedication for many years. One night, a vision, vivid and harrowing, invaded your dreams. 
    This vision, unlike any he had experienced before, showed a future where Briarmourn lay in ruins, its people suffering under the yoke of unending calamity.
    
    The king, though wise, dismissed your vision as a mere nightmare, a product of stress and overwork. Desperate and determined, you took matters into your own hands
    and decided to embark on a perilous journey to gather allies and warn the people of impending doom.`,

    Available: true,
    StartingMap: "Willowvale",
    StartingX: 6332,
    StartingY: 5245,
    StartingHour: 9,
    StartingMinute: 0,

    WorldData: {
        Willowvale: Willowvale,
        WillowvaleCaverns: WillowvaleCaverns,
        WillowvaleNorth: WillowvaleNorth
    },

}

export default TheMidnightAccord;