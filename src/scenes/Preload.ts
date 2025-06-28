import * as Assets from '../assets';
import Cursor from '../images/click_cursor.png';

export default class Preload extends Phaser.Scene {

    constructor () {
        super("Preload");
    }

    preload () {

        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        let LoadingText = this.add.text(this.scale.width / 2, this.scale.height / 2, "Loading...", { 
            fontSize: 32,
            fontFamily: "Augusta",
            align: "center"
        }).setOrigin(0.5);

        const loadingBarBackground = this.add.graphics();
        loadingBarBackground.fillStyle(0x707070, 1);
        loadingBarBackground.fillRect(LoadingText.getBottomLeft().x, LoadingText.getBottomLeft().y + 30, LoadingText.width, 25);

        const loadingBar = this.add.graphics();

        this.load.on("progress", (value: any) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xffffff, 1);
            loadingBar.fillRect(LoadingText.getBottomLeft().x, LoadingText.getBottomLeft().y + 30, LoadingText.width * value, 25);
        });

        this.load.on("complete", (value: any) => {
            loadingBar.destroy();
        });

        this.load.font("Dungeon", Assets.Dungeon, 'truetype');
        this.load.font("Augusta", Assets.Augusta, 'truetype');
        this.load.font("Flesh", Assets.Flesh, 'truetype');
        this.load.font("Mooli", Assets.Mooli, 'truetype');

        this.load.image('BookBG', Assets.BookBG);
        this.load.image('logo', Assets.Logo);
        this.load.image('background', Assets.MenuBackground);

        this.load.audio('woodcutting', [Assets.Woodcutting]);
        this.load.audio('mining', [Assets.Mining]);
        this.load.audio('harvesting', [Assets.Harvesting]);
        this.load.audio('footstep', [Assets.Footstep]);
        this.load.audio('click', [Assets.Click]);
        this.load.audio('theme', [Assets.Theme]);
        this.load.audio('track1', [Assets.Track1]);
        this.load.audio('rain', [Assets.RainLoop]);
        this.load.audio('KineticBoltCast', [Assets.Cast]);
        this.load.audio('DartVolleyCast', [Assets.Cast2]);
        this.load.audio('Hit', [Assets.Hit]);
        this.load.audio('KineticBoltHit', [Assets.Hit2]);
        this.load.audio('ExplosionHit', [Assets.ExplosionHit]);
        this.load.audio('Money', [Assets.Money]);
        this.load.audio('InventoryPickup', [Assets.InventoryPickup]);
        this.load.audio('InventoryPutdown', [Assets.InventoryPutdown]);

        this.load.spritesheet("Elyndor", Assets.Elyndor, { frameWidth: 32, frameHeight: 32 });

        //this.load.spritesheet("Operative", Assets.Operative, { frameWidth: 32, frameHeight: 32 });

        this.load.aseprite({
            key: 'Operative',
            textureURL: Assets.HumanOperativeSpritesheet,
            atlasURL: Assets.HumanOperativeJSON,
        });

        this.load.spritesheet("BloodOne", Assets.BloodOne, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet("BloodTwo", Assets.BloodTwo, { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet("BloodArcaneOne", Assets.BloodArcaneOne, { frameWidth: 100, frameHeight: 100 });
        this.load.image('blue-bar', Assets.BlueBar);
        this.load.image('red-bar', Assets.RedBar);
        this.load.image('yellow-bar', Assets.YellowBar);
        this.load.image('green-bar', Assets.GreenBar);
        this.load.image('panel', Assets.Panel);
        this.load.image('panel-small', Assets.PanelSmall);
        this.load.image('button', Assets.Button);
        this.load.image('button-down', Assets.ButtonDown);
        this.load.spritesheet("inputs", Assets.Inputs, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("Kinetic Bolt", Assets.ArcaneDart, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("Dart Volley", Assets.DartVolley, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("Goblin-Arrow", Assets.GoblinArrow, { frameWidth: 16, frameHeight: 8 });

        // Portraits
        this.load.spritesheet("Head", Assets.Head, { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet("Body", Assets.Body, { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet("Detail", Assets.Detail, { frameWidth: 162, frameHeight: 162 });

        // Buildings
        this.load.spritesheet("combat", Assets.CombatSheet, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("wood-tile", Assets.WoodTile, { frameWidth: 82, frameHeight: 82 });
        this.load.spritesheet("characters", Assets.Characters, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("mining-nodes", Assets.MiningNodes, { frameWidth: 32, frameHeight: 32 });


        this.load.atlas({
            key: 'Buildings', 
            textureURL: Assets.Buildings,
            //normalMap: Assets.BuildingsNormalMap,
            atlasURL: Assets.BuildingsJSON 
        });

        this.load.image('WillowvaleMap', Assets.WillowvaleMap);
        this.load.image('WillowvaleNorthMap', Assets.WillowvaleNorthMap);

        this.load.spritesheet("monsters", Assets.Monsters, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("items", Assets.Items, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("tiles", Assets.Tiles, { frameWidth: 32, frameHeight: 32 });

        // Admurin
        this.load.spritesheet("general", Assets.AdmurinGeneral, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("botany", Assets.AdmurinBotany, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("gems2", Assets.AdmurinGemsTwo, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("potions", Assets.AdmurinPotions, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("librarium", Assets.AdmuringLibrarium, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("flowers", Assets.AdmurinFlowers, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("fishing", Assets.AdmurinFishingB, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("SkillsA", Assets.SkillsA, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("SkillsB", Assets.SkillsB, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("bonus1", Assets.AdmurinBonus1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("weapons", Assets.Weapons, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("armour", Assets.Armour, { frameWidth: 32, frameHeight: 32 });

        this.load.tilemapTiledJSON("TestMap", Assets.TestMap);
        this.load.tilemapTiledJSON("Willowvale", Assets.Willowvale);
        this.load.tilemapTiledJSON("WillowvaleCaverns", Assets.WillowvaleCaverns);

        this.load.spritesheet("woodland", Assets.Woodland, { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet("RA_Animated_Water", Assets.RA_Animated_Water, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Interior", Assets.RA_Interior, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Crypt", Assets.RA_Crypt, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Graveyard", Assets.RA_Graveyard, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Ground_Tiles", Assets.RA_Ground_Tiles, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Jungle", Assets.RA_Jungle, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Jungle_Animation", Assets.RA_Jungle_Animation, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Jungle_Extras", Assets.RA_Jungle_Extras, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Village", Assets.RA_Village, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Village_Animations", Assets.RA_Village_Animations, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Wasteland_Water", Assets.RA_Wasteland_Water, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Wasteland", Assets.RA_Wasteland, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Cavern_Full", Assets.RA_Cavern_Full, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("tree03_s_01_animation", Assets.tree03_s_01_animation, { frameWidth: 128, frameHeight: 160 });
        this.load.spritesheet("XanthirGate", Assets.XanthirGate, { frameWidth: 92, frameHeight: 114 });
        
        this.load.spritesheet("Tileset_Indoors_v1", Assets.Tileset_Indoors_v1, { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet("Limmy", Assets.Limmy, { frameWidth: 56, frameHeight: 56 });
        this.load.aseprite({ key: 'Journal', textureURL: Assets.JournalImage, atlasURL: Assets.JournalJSON });
        this.load.aseprite({ key: 'Panel-Borders', textureURL: Assets.PanelBordersImage, atlasURL: Assets.PanelBordersJSON });
        this.load.atlas({ key: 'Kenney-UI', textureURL: Assets.KenneyUIImage, atlasURL: Assets.KenneyUIJSON });

        this.load.spritesheet("Explosion1Sheet", Assets.Explosion1, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("Explosion2Sheet", Assets.Explosion2, { frameWidth: 64, frameHeight: 64 });

        this.load.image('Rain', Assets.Rain);
        this.load.spritesheet('RainSpritesheet', Assets.RainSpritesheet, { frameWidth: 16, frameHeight: 16 });

    }

    create () {

        this.anims.createFromAseprite('Operative');

        this.anims.create({
            key: "rain-end", 
            frames: this.anims.generateFrameNumbers('RainSpritesheet', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: "explosion-1", 
            frames: this.anims.generateFrameNumbers('Explosion2Sheet', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: "explosion-2", 
            frames: this.anims.generateFrameNumbers('Explosion2Sheet', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: "Limmy-Anim", 
            frames: this.anims.generateFrameNumbers('Limmy', { start: 0, end: 51 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.createFromAseprite('Journal');

        this.anims.create({ 
            key: "EvokerWalk", 
            frames: this.anims.generateFrameNumbers('Elyndor', { frames: [ 1, 2 ] }),
            frameRate: 5,
            repeat: -1
        });

        /*this.anims.create({ 
            key: "OperativeWalk", 
            frames: this.anims.generateFrameNumbers('Operative', { frames: [ 1, 2, 3, 4 ] }),
            frameRate: 5,
            repeat: -1
        });*/

        const animations = [
            { key: 'GoblinSlingerWalk', frames: [ 118, 119 ] },
            { key: 'gladiator_walk', frames: [ 0, 1 ] },
            { key: 'godsworn_walk', frames: [ 6, 7 ] },
            { key: 'operative_walk', frames: [ 8, 9 ] },
            { key: 'harbinger_walk', frames: [ 14, 15 ] },
        ];

        animations.forEach(anim => {
            this.anims.create({ 
                key: anim.key, 
                frames: this.anims.generateFrameNumbers('characters', { frames: anim.frames }),
                frameRate: 5,
                repeat: -1
            });
        });

        this.anims.create({
            key: "arcane-dart-anim", 
            frames: this.anims.generateFrameNumbers('Kinetic Bolt', { frames: [0, 1, 2] }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: "dart-volley-anim", 
            frames: this.anims.generateFrameNumbers('Dart Volley', { frames: [0, 1, 2, 3] }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: "blood-anim", 
            frames: this.anims.generateFrameNumbers('BloodOne', { start: 0, end: 35 }),
            frameRate: 240,
            repeat: 0
        });

        this.anims.create({
            key: "blood-anim-2", 
            frames: this.anims.generateFrameNumbers('BloodTwo', { start: 0, end: 12 }),
            frameRate: 60,
            repeat: 0
        });

        this.anims.create({
            key: "blood-arcane-anim-1", 
            frames: this.anims.generateFrameNumbers('BloodArcaneOne', { start: 0, end: 21 }),
            frameRate: 60,
            repeat: 0
        });

        this.anims.create({
            key: "tree-03-anim", 
            frames: this.anims.generateFrameNumbers('tree03_s_01_animation', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.start("Menu");
    }

}