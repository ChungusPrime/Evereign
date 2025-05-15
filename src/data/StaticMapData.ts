import TestMapData from './_TestMapData';
import WillowvaleCavernsData from './_WillowvaleCavernsData';
import WillowvaleData from './_WillowvaleData';
import WillowValeNorthData from './_WillowvaleNorthData';

const StaticMapData: {[key: string]: StaticMapData} = {
    Willowvale: WillowvaleData,
    WillowvaleCaverns: WillowvaleCavernsData,
    TestMap: TestMapData,
    WillowvaleNorth: WillowValeNorthData
}

export default StaticMapData;
