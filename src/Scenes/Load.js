class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");                         // Packed tilemap
        this.load.image("tilemap_tiles2", "tilemap_packed (2).png");
        this.load.image("tilemap_tiles3", "tilemap_packed (3).png");
        this.load.image("tilemap_tiles4", "tilemap_packed (4).png");
        this.load.image("tilemap_tiles5", "marble_packed.png");
        this.load.audio("walker", "footstep_snow_003.ogg"); 
        this.load.audio("jumper", "impactMining_001.ogg"); 
        this.load.audio("lander", "impactWood_heavy_003.ogg"); 
        this.load.audio("graber", "impactBell_heavy_000.ogg");
        this.load.tilemapTiledJSON("TheDeep", "TheDeep.tmj");  

        
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.multiatlas("kenny-particles", "kenny-particles.json"); //particles

    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 0,
                end: 1,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0000.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0001.png" }
            ],
        });

         // ...and pass to the next Scene
         this.scene.start("depths");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}