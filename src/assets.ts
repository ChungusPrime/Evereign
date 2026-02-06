// ============================================================================
// Asset Manifest - Data-Driven Asset Loading System
// ============================================================================
// All game assets are defined in this manifest and automatically loaded
// by the Preload scene. To add a new asset, simply add it to the appropriate
// category below.
// ============================================================================

export interface FontAsset {
    key: string;
    path: string;
    type?: string;
}

export interface ImageAsset {
    key: string;
    path: string;
}

export interface AudioAsset {
    key: string;
    path: string;
    attribution?: string;
}

export interface SpritesheetAsset {
    key: string;
    path: string;
    frameWidth: number;
    frameHeight: number;
}

export interface TilemapAsset {
    key: string;
    path: string;
}

export interface AtlasAsset {
    key: string;
    texturePath: string;
    atlasPath: string;
    normalMapPath?: string;
}

export interface AsepriteAsset {
    key: string;
    texturePath: string;
    atlasPath: string;
}

export interface AssetManifest {
    fonts: FontAsset[];
    images: ImageAsset[];
    audio: AudioAsset[];
    spritesheets: SpritesheetAsset[];
    tilemaps: TilemapAsset[];
    atlases: AtlasAsset[];
    aseprites: AsepriteAsset[];
}

// ============================================================================
// Asset Manifest Definition
// ============================================================================

export const Manifest: AssetManifest = {

    // ========================================================================
    // Fonts
    // ========================================================================
    fonts: [
        { key: 'Dungeon', path: require('./assets/fonts/DungeonFont.ttf'), type: 'truetype' },
        { key: 'Augusta', path: require('./assets/fonts/Augusta.ttf'), type: 'truetype' },
        { key: 'Flesh', path: require('./assets/fonts/Fleshandblood-MVA5x.ttf'), type: 'truetype' },
        { key: 'Mooli', path: require('./assets/fonts/Mooli-Regular.ttf'), type: 'truetype' },
    ],

    // ========================================================================
    // Images
    // ========================================================================
    images: [
        { key: 'BookBG', path: require('./assets/images/bookbg.png') },
        { key: 'logo', path: require('./assets/images/logo.png') },
        { key: 'WillowvaleMap', path: require('./assets/maps/Willowvale.png') },
        { key: 'WillowvaleNorthMap', path: require('./assets/maps/WillowvaleNorth.png') },
        { key: 'Rain', path: require('./assets/images/Rain.png') },
    ],

    // ========================================================================
    // Audio
    // ========================================================================
    audio: [
        { key: 'woodcutting', path: require('./assets/audio/woodcutting.mp3'), attribution: 'Zapslat - https://www.zapsplat.com/music/axe-chop-wood-7/' },
        { key: 'mining', path: require('./assets/audio/mining.mp3'), attribution: 'Zapslat - https://www.zapsplat.com/music/brick-throw-and-hit-paving-stone-4/' },
        { key: 'harvesting', path: require('./assets/audio/harvest.mp3') },
        { key: 'footstep', path: require('./assets/audio/footstep.mp3'), attribution: 'Zapslat - https://www.zapsplat.com/music/adult-sized-wellington-boots-single-footstep-on-gravel-stones-12/' },
        { key: 'click', path: require('./assets/audio/button_click.mp3'), attribution: 'Zapslat - https://www.zapsplat.com/music/bright-button-click-1/' },
        { key: 'theme', path: require('./assets/audio/Into-Oblivion.mp3'), attribution: 'Peaceful Forest - Into Oblivion by Darren Curtis (https://www.darrencurtismusic.com)' },
        { key: 'track1', path: require('./assets/audio/One-Bard-Band.mp3'), attribution: 'Music: One Bard Band by Alexander Nakarada (www.creatorchords.com) - Licensed under Creative Commons BY Attribution 4.0 License' },
        { key: 'rain', path: require('./assets/audio/rain.wav'), attribution: 'Helton Yan - https://heltonyan.itch.io/weatherelements' },
        { key: 'KineticBoltCast', path: require('./assets/audio/03_Wind_Throw.wav'), attribution: 'MiniFantasy - Minifantasy_MagicAndSorcery_SFX' },
        { key: 'DartVolleyCast', path: require('./assets/audio/01_Cast.wav'), attribution: 'Leophaz - Lightning_magic_SFX' },
        { key: 'Hit', path: require('./assets/audio/02_Hit.wav'), attribution: 'Leophaz - Lightning_magic_SFX' },
        { key: 'KineticBoltHit', path: require('./assets/audio/04_Wind_Hit.wav'), attribution: 'MiniFantasy - Minifantasy_MagicAndSorcery_SFX' },
        { key: 'ExplosionHit', path: require('./assets/audio/05_Fire_explosion_05_large.wav'), attribution: 'Leophaz - 50_RPG_Battle_Magic_SFX' },
        { key: 'Money', path: require('./assets/audio/Coins.wav'), attribution: 'Leophaz - Inventory_SFX_Pack' },
        { key: 'InventoryPickup', path: require('./assets/audio/Item_Pick.wav'), attribution: 'Leophaz - Inventory_SFX_Pack' },
        { key: 'InventoryPutdown', path: require('./assets/audio/Item_Place.wav'), attribution: 'Leophaz - Inventory_SFX_Pack' },
        { key: 'ShotgunFire', path: require('./assets/audio/zapsplat_warfare_gun_rifles_single_shot_designed_71743.mp3'), attribution: 'Zapslat - https://www.zapsplat.com/music/gun-rifle-single-shot-designed/' },
        { key: 'ShotgunReload', path: require('./assets/audio/weapon_gun_charles_daly_H_6.mp3'), attribution: 'Zapslat - https://www.zapsplat.com/music/charles-daly-cd-ftaw-shotgun-pump-action-12-gauge-full-cycle-loaded-mag/' },
    ],

    // ========================================================================
    // Spritesheets
    // ========================================================================
    spritesheets: [
        // Blood/Particles
        { key: 'BloodOne', path: require('./assets/images/Blood1.png'), frameWidth: 100, frameHeight: 100 },
        { key: 'BloodTwo', path: require('./assets/images/Blood2.png'), frameWidth: 100, frameHeight: 100 },
        { key: 'BloodArcaneOne', path: require('./assets/images/BloodArcane1.png'), frameWidth: 100, frameHeight: 100 },
        
        // Projectiles
        { key: 'Kinetic Bolt', path: require('./assets/images/ArcaneDart.png'), frameWidth: 16, frameHeight: 16 },
        { key: 'Dart Volley', path: require('./assets/images/DartVolley.png'), frameWidth: 16, frameHeight: 16 },
        { key: 'Goblin-Arrow', path: require('./assets/images/GoblinArrow.png'), frameWidth: 16, frameHeight: 8 },
        
        // Portraits
        { key: 'Head', path: require('./assets/images/portraits/Head.png'), frameWidth: 162, frameHeight: 162 },
        { key: 'Body', path: require('./assets/images/portraits/Body.png'), frameWidth: 162, frameHeight: 162 },
        { key: 'Detail', path: require('./assets/images/portraits/Detail.png'), frameWidth: 162, frameHeight: 162 },
        
        // Buildings/Combat
        { key: 'combat', path: require('./assets/images/Combat-Sheet.png'), frameWidth: 64, frameHeight: 64 },
        { key: 'wood-tile', path: require('./assets/images/wood-tile.jpg'), frameWidth: 82, frameHeight: 82 },
        
        // Characters/Enemies
        { key: 'characters', path: require('./assets/images/characters.png'), frameWidth: 16, frameHeight: 16 },
        { key: 'Orcs', path: require('./assets/images/own/characters/Orcs.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'Player', path: require('./assets/images/own/characters/Player.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'PlayerEquipment', path: require('./assets/images/own/characters/PlayerEquipment.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'monsters', path: require('./assets/images/monsters.png'), frameWidth: 32, frameHeight: 32 },
        
        // Items/Resources
        { key: 'mining-nodes', path: require('./assets/images/own/smalldeposits.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'ownmisc', path: require('./assets/images/own/miscitems.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'items', path: require('./assets/images/items.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'tiles', path: require('./assets/images/background.png'), frameWidth: 32, frameHeight: 32 },
        
        // Admurin Asset Pack
        { key: 'general', path: require('./assets/images/admurin/ItemsGeneral.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'botany', path: require('./assets/images/admurin/Botany.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'gems2', path: require('./assets/images/admurin/Gems_II.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'potions', path: require('./assets/images/admurin/Item_Sheet_Potions.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'librarium', path: require('./assets/images/admurin/Item_Sheet_Librarium.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'flowers', path: require('./assets/images/admurin/Item_Spritesheet_Flowers.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'fishing', path: require('./assets/images/admurin/ItemsFishingB.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'SkillsA', path: require('./assets/images/admurin/Skills_Final.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'SkillsB', path: require('./assets/images/admurin/Skill_B.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'bonus1', path: require('./assets/images/admurin/Bonus_Items_1.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'weapons', path: require('./assets/images/admurin/32x32_PixelWeapons_Premium.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'armour', path: require('./assets/images/admurin/32x32_PixelArmor_Premium_2.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'leather_dark', path: require('./assets/images/admurin/LeatherDark.png'), frameWidth: 32, frameHeight: 32 },
        
        // Environment
        { key: 'woodland', path: require('./assets/images/own/woodland.png'), frameWidth: 32, frameHeight: 32 },
        
        // Rogue Adventure Tilesheets
        { key: 'RA_Animated_Water', path: require('./assets/images/rogue-adventure/RA_Animated_Water.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Interior', path: require('./assets/images/rogue-adventure/RA_Interior.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Crypt', path: require('./assets/images/rogue-adventure/RA_Crypt.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Graveyard', path: require('./assets/images/rogue-adventure/RA_Graveyard.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Ground_Tiles', path: require('./assets/images/rogue-adventure/RA_Ground_Tiles.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Jungle', path: require('./assets/images/rogue-adventure/RA_Jungle.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Jungle_Animation', path: require('./assets/images/rogue-adventure/RA_Jungle_Animation.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Jungle_Extras', path: require('./assets/images/rogue-adventure/RA_Jungle_Extras.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Village', path: require('./assets/images/rogue-adventure/RA_Village.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Village_Animations', path: require('./assets/images/rogue-adventure/RA_Village_Animations.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Village_Animation02', path: require('./assets/images/rogue-adventure/RA_Village_Animation02.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Wasteland_Water', path: require('./assets/images/rogue-adventure/RA_Wasteland_Water.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Wasteland', path: require('./assets/images/rogue-adventure/RA_Wasteland.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Cavern_Full', path: require('./assets/images/rogue-adventure/RA_Cavern_Full.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Ship', path: require('./assets/images/rogue-adventure/RA_Ship.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'RA_Village_Animation03', path: require('./assets/images/rogue-adventure/RA_Village_Animation03.png'), frameWidth: 64, frameHeight: 64 },

        { key: 'WillowTree', path: require('./assets/images/own/WillowTree.png'), frameWidth: 192, frameHeight: 192 },

        // Special/Animated
        { key: 'tree03_s_01_animation', path: require('./assets/images/rogue-adventure/tree03_s_01_animation.png'), frameWidth: 128, frameHeight: 160 },
        { key: 'XanthirGate', path: require('./assets/images/rogue-adventure/XanthirGate.png'), frameWidth: 92, frameHeight: 114 },
        { key: 'The Ground V1-1', path: require('./assets/images/The Ground V1-1.png'), frameWidth: 32, frameHeight: 32 },
        { key: 'Limmy', path: require('./assets/images/limmy.png'), frameWidth: 56, frameHeight: 56 },
        
        // Explosions
        { key: 'Explosion1Sheet', path: require('./assets/images/336.png'), frameWidth: 64, frameHeight: 64 },
        { key: 'Explosion2Sheet', path: require('./assets/images/293.png'), frameWidth: 64, frameHeight: 64 },
        
        // Weather
        { key: 'RainSpritesheet', path: require('./assets/images/RainEnd.png'), frameWidth: 16, frameHeight: 16 },
    ],

    // ========================================================================
    // Tilemaps (Tiled JSON)
    // ========================================================================
    tilemaps: [
        { key: 'TestMap', path: require('./assets/maps/TestMap.json') },
        { key: 'Willowvale', path: require('./assets/maps/Willowvale.json') },
        { key: 'WillowvaleCaverns', path: require('./assets/maps/WillowvaleCaverns.json') },
        { key: 'Tutors Island', path: require('./assets/maps/TutorsIsland.json') },
    ],

    // ========================================================================
    // Texture Atlases
    // ========================================================================
    atlases: [
        { key: 'inputs', texturePath: require('./assets/images/inputatlas.png'), atlasPath: require('./assets/images/inputatlas.json') },
        { key: 'Buildings', texturePath: require('./assets/images/own/atlas/buildings.png'), atlasPath: require('./assets/images/own/atlas/buildings.json'), /*normalMapPath: require('./assets/images/own/atlas/buildings_normal.png')*/ },
        { key: 'Kenney-UI', texturePath: require('./assets/images/KenneyUI.png'), atlasPath: require('./assets/images/KenneyUI.json') },
    ],

    // ========================================================================
    // Aseprite Animations
    // ========================================================================
    aseprites: [
        { key: 'Operative', texturePath: require('./assets/images/own/characters/Humans.png'), atlasPath: require('./assets/images/own/characters/Humans.json') },
        { key: 'Journal', texturePath: require('./assets/images/Journal.png'), atlasPath: require('./assets/images/Journal.json') },
        { key: 'Panel-Borders', texturePath: require('./assets/images/Panel-Borders-T.png'), atlasPath: require('./assets/images/Panel-Borders-T.json') },
    ],
};

// ============================================================================
// Cursor (loaded separately before Preload)
// ============================================================================
export const Cursor: string = require('./assets/images/click_cursor.png');
