interface BuildingData {
    name: string;
    description: string;
    size: number;
    housingSlots: number;
    aggroZone: boolean;
    productsPerTick: { ID: number; Amount: number; }[];
    currentJob: string;
    costMultiplier: number;
}

const TownCentreData: BuildingData = {
    name: "Town Centre",
    description: `The Town Centre provides housing for people and projects an area in which other buildings can be placed.
    Other buildings must be placed within the radius of the Town Centre but the Town Centre itself can be placed anywhere.
    Only one Town Centre can be built per map region.`,
    size: 3,
    housingSlots: 5,
    aggroZone: true,
    productsPerTick: [
        { ID: 1, Amount: 1 },
        { ID: 2, Amount: 2 }
    ],
    currentJob: "None",
    costMultiplier: 1.0
};

export default TownCentreData;