import { Manifest, Cursor } from '../assets';

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
        loadingBarBackground.fillRect(LoadingText.getBottomLeft().x - 75, LoadingText.getBottomLeft().y + 30, 250, 25);

        const loadingBar = this.add.graphics();
        this.load.on("progress", (value: any) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xffffff, 1);
            loadingBar.fillRect(LoadingText.getBottomLeft().x - 75, LoadingText.getBottomLeft().y + 30, 250 * value, 25);
        });

        this.load.on("complete", (value: any) => {
            loadingBar.destroy();
        });

        // ====================================================================
        // Load all assets from manifest
        // ====================================================================

        // Fonts
        for (const font of Manifest.fonts) {
            this.load.font(font.key, font.path, font.type || 'truetype');
        }

        // Images
        for (const image of Manifest.images) {
            this.load.image(image.key, image.path);
        }

        // Audio
        for (const audio of Manifest.audio) {
            this.load.audio(audio.key, [audio.path]);
        }

        // Spritesheets
        for (const sheet of Manifest.spritesheets) {
            this.load.spritesheet(sheet.key, sheet.path, { 
                frameWidth: sheet.frameWidth, 
                frameHeight: sheet.frameHeight 
            });
        }

        // Tilemaps
        for (const tilemap of Manifest.tilemaps) {
            this.load.tilemapTiledJSON(tilemap.key, tilemap.path);
        }

        // Atlases
        for (const atlas of Manifest.atlases) {
            this.load.atlas({
                key: atlas.key,
                textureURL: atlas.texturePath,
                atlasURL: atlas.atlasPath,
                ...(atlas.normalMapPath && { normalMap: atlas.normalMapPath })
            });
        }

        // Aseprite animations
        for (const aseprite of Manifest.aseprites) {
            this.load.aseprite({
                key: aseprite.key,
                textureURL: aseprite.texturePath,
                atlasURL: aseprite.atlasPath,
            });
        }
    }

    create () {

        this.anims.createFromAseprite('Operative');
        this.anims.createFromAseprite('Journal');

        this.anims.create({
            key: "torch-anim", 
            frames: this.anims.generateFrameNumbers('RA_Village_Animation02', { start: 20, end: 23 }),
            frameRate: 8,
            repeat: 1
        });

        this.anims.create({
            key: "torch-pole-anim", 
            frames: this.anims.generateFrameNumbers('RA_Village_Animation03', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: 1
        });

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

        /*this.anims.create({ 
            key: "OperativeWalk", 
            frames: this.anims.generateFrameNumbers('Operative', { frames: [ 1, 2, 3, 4 ] }),
            frameRate: 5,
            repeat: -1
        });*/

        this.anims.create({
            key: "GoblinSlingerWalk", 
            frames: this.anims.generateFrameNumbers('Orcs', { frames: [ 2, 3] }),
            frameRate: 5,
            repeat: -1
        });

        const animations = [
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