import * as Assets from '../assets';

export default class Preload extends Phaser.Scene {

    constructor () {
        super("Preload");
    }

    preload () {

        let LoadingText = this.add.text(this.scale.width / 2, this.scale.height / 2, "Loading...", { 
            fontSize: 32,
            fontFamily: "Augusta",
            align: "center"
        }).setOrigin(0.5);

        
        const loadingBarBackground = this.add.graphics();
        loadingBarBackground.fillStyle(0xd1d1d1, 1);
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

        this.load.image('logo', Assets.Logo);
        this.load.image('background', Assets.MenuBackground);
        this.load.audio('footstep', [Assets.Footstep]);
        this.load.audio('woodcutting', [Assets.Woodcutting]);
        this.load.audio('mining', [Assets.Mining]);
        this.load.audio('click', [Assets.Click]);
        this.load.audio('theme', [Assets.Theme]);
        this.load.audio('track1', [Assets.Track1]);
        this.load.audio('rain', [Assets.RainAudio]);
        this.load.audio('KineticBoltCast', [Assets.Cast]);
        this.load.audio('DartVolleyCast', [Assets.Cast2]);
        
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
        this.load.spritesheet("Head", Assets.Head, { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet("Body", Assets.Body, { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet("Detail", Assets.Detail, { frameWidth: 162, frameHeight: 162 });
        this.load.spritesheet("Kinetic Bolt", Assets.ArcaneDart, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("Goblin-Arrow", Assets.GoblinArrow, { frameWidth: 16, frameHeight: 8 });
        this.load.bitmapFont("Dungeon", Assets.DungeonImage, Assets.DungeonXML);
        this.load.bitmapFont("Augusta", Assets.AugustaImage, Assets.AugustaXML);
        this.load.spritesheet('Farm', Assets.Farm, {frameWidth: 224, frameHeight: 224});
        this.load.spritesheet('Inn', Assets.Inn, {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('GoblinOutpost', Assets.GoblinOutpost, {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('GoblinTower', Assets.GoblinTower, {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('Warehouse', Assets.Warehouse, {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('Mine', Assets.Mine, {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('Market', Assets.TradePost, {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('LoggingCamp', Assets.LoggingCamp, {frameWidth: 128, frameHeight: 128});
        this.load.spritesheet('BallistaTower', Assets.BallistaTower, {frameWidth: 64, frameHeight: 64});
        this.load.image('Ballista', Assets.Ballista);
        this.load.spritesheet("combat", Assets.CombatSheet, { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("wood-tile", Assets.WoodTile, { frameWidth: 82, frameHeight: 82 });
        this.load.spritesheet("characters", Assets.Characters, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("mining-nodes", Assets.MiningNodes, { frameWidth: 32, frameHeight: 32 });
        this.load.image('WillowvaleMap', Assets.WillowvaleMap);
        this.load.image('Rain', Assets.Rain);
        this.load.spritesheet("monsters", Assets.Monsters, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("items", Assets.Items, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("tiles", Assets.Tiles, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("SkillsA", Assets.SkillsA, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("SkillsB", Assets.SkillsB, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("general", Assets.AdmurinGeneral, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("botany", Assets.AdmurinBotany, { frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON("Willowvale", Assets.Willowvale);
        this.load.tilemapTiledJSON("WillowvaleCaverns", Assets.WillowvaleCaverns);
        this.load.spritesheet("RA_Animated_Water", Assets.RA_Animated_Water, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Graveyard", Assets.RA_Graveyard, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Ground_Tiles", Assets.RA_Ground_Tiles, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Jungle", Assets.RA_Jungle, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Jungle_Animation", Assets.RA_Jungle_Animation, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Jungle_Extras", Assets.RA_Jungle_Extras, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Village", Assets.RA_Village, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Village_Animations", Assets.RA_Village_Animations, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("RA_Wasteland_Water", Assets.RA_Wasteland_Water, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("tree03_s_01_animation", Assets.tree03_s_01_animation, { frameWidth: 128, frameHeight: 160 });
        this.load.spritesheet("Limmy", Assets.Limmy, { frameWidth: 56, frameHeight: 56 });
        this.load.aseprite({ key: 'Journal', textureURL: Assets.JournalImage, atlasURL: Assets.JournalJSON });
        this.load.aseprite({ key: 'Panel-Borders', textureURL: Assets.PanelBordersImage, atlasURL: Assets.PanelBordersJSON });
        this.load.atlas({ key: 'Kenney-UI', textureURL: Assets.KenneyUIImage, atlasURL: Assets.KenneyUIJSON });

        this.load.spritesheet({
            key: 'TownCentre',
            url: Assets.TownCentre,
            normalMap: Assets.TownCentreNormal,
            frameConfig: {
                frameWidth: 224,
                frameHeight: 224
            }
        });

        this.load.spritesheet({
            key: 'Dwelling',
            url: Assets.Dwelling,
            normalMap: Assets.DwellingNormal,
            frameConfig: {
                frameWidth: 128,
                frameHeight: 128
            }
        });
    }

    create () {

        this.anims.create({
            key: "Limmy-Anim", 
            frames: this.anims.generateFrameNumbers('Limmy', { start: 0, end: 51 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.createFromAseprite('Journal');

        const animations = [
            { key: 'EvokerWalk', frames: [ 12, 13 ] },
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