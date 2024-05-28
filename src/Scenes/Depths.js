class Depth extends Phaser.Scene {
    constructor() {
        super("depths");
        this.perish = this.perish.bind(this);
        this.winner = this.winner.bind(this);
    }
    init() {
        this.ACCELERATION = 500;
        this.DRAG = 1800;
        this.physics.world.gravity.y = 1200;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
    }
    
    perish() {  
        this.add.particles(my.sprite.player.body.x, my.sprite.player.body.y, "kenny-particles", {
            frame: ['dirt_02.png'],
            // TODO: Try: add random: true
            scale: {start: 0.1, end: 0.4}, 
            // TODO: Try: maxAliveParticles: 8,
            lifespan: 3050, duration: 3050, maxAliveParticles: 8,
            // TODO: Try: gravityY: -400,
            alpha: {start: 1, end: 0}, gravityY: -600
        });
        my.sprite.player.body.x = 50;
        my.sprite.player.body.y = game.config.height - 290;
        my.sprite.player.body.velocity.x = 0;
        my.sprite.player.body.velocity.y = 0;
    }

    winner(){
        this.scene.start("win");
    }

    create() {
        this.physics.world.setBounds(0,0, 18*50*2, 100*18*2);
        this.cameras.main.setBounds(0,0,18*50*2, 100*18*2);
        this.map = this.add.tilemap("TheDeep", 18, 18, 50, 100);
        this.tileset = this.map.addTilesetImage("sprtite", "tilemap_tiles");
        this.tileset2 = this.map.addTilesetImage("Farm", "tilemap_tiles2");
        this.tileset3 = this.map.addTilesetImage("foodworld", "tilemap_tiles3");
        this.tileset4 = this.map.addTilesetImage("MachineWorld", "tilemap_tiles4");
        this.tileset5 = this.map.addTilesetImage("Blocky", "tilemap_tiles5");

        
        this.Background = this.map.createLayer("BackBackground", this.tileset5, 0, 0);
        this.Background.setScale(2.0);
        this.decor = this.map.createLayer("Decor", [this.tileset, this.tileset2, this.tileset3, this.tileset4], 0, 0);
        this.decor.setScale(2.0);
        this.land = this.map.createLayer("Land", [this.tileset, this.tileset2, this.tileset3, this.tileset4], 0, 0);
        this.land.setScale(2.0);
        this.toxic = this.map.createLayer("toxic", this.tileset4, 0, 0);
        this.toxic.setScale(2.0);
        this.vic = this.map.createLayer("vic", this.tileset, 0, 0);
        this.vic.setScale(2.0);
        
        this.land.setCollisionByProperty({
            collides: true
        });

        this.toxic.setCollisionByProperty({
            death: true
        });
        
        this.vic.setCollisionByProperty({
            vic: true
        });
        /*
        this.coins = this.map.createFromObjects("objects", {
            name: "coin",
            key: "tilemap_sheet",
            frame: 151,
        });

        this.spawn = this.map.createFromObjects("objects", {
            name: "spawn",
            key: "tilemap_sheet",
            frame: 151
        });

        this.key = this.map.createFromObjects("objects", {
            name: "key",
            key: "tilemap_sheet",
            frame: 151
        });
        
        this.end = this.map.createFromObjects("objects", {
            name: "end",
            key: "tilemap_sheet",
            frame: 151
        });

        this.coins.x *= 2;
        
        this.score = 0;

        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.spawn, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.key, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.end, Phaser.Physics.Arcade.STATIC_BODY);
        /*
        this.coinGroup = this.add.group(this.coins);  
        this.coinGroup = this.add.group(this.coins);
        
        
        this.physics.add.overlap(my.sprite.player, this.end, (obj1, obj2) => {
            this.winner;
        });*/
        my.sprite.player = this.physics.add.sprite(50, game.config.height - 270, "platformer_characters", "tile_0000.png").setScale(SCALE)
        my.sprite.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(50, 50);
        cursors = this.input.keyboard.createCursorKeys();
        my.sprite.player.body.setMaxVelocityX(400);
        my.sprite.player.body.setMaxVelocityY(500);

        this.count = 0;
        this.jankwalk = 0;
        this.physics.add.collider(my.sprite.player, this.land);
        this.physics.add.collider(my.sprite.player, this.toxic, this.perish);
        this.physics.add.collider(my.sprite.player, this.vic, this.winner);

        
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            this.add.particles(obj2.x, obj2.y, "kenny-particles", {
                frame: ['circle_01.png'],
                // TODO: Try: add random: true
                scale: {start: 0, end: 0.4}, 
                // TODO: Try: maxAliveParticles: 8,
                lifespan: 350, duration: 250, maxAliveParticles: 1,
                // TODO: Try: gravityY: -400,
                alpha: {start: 1, end: 0}
            });
            this.score+= 1;
            this.sound.play("graber");
            obj2.destroy(); // remove coin on overlap
        });
        
        
        //this.animatedTiles.init(this.map);
        my.vfx = this.add.particles(my.sprite.player.x, my.sprite.player.y, "kenny-particles", {
            frame: ['smoke_03.png', 'smoke_09.png'],
            // TODO: Try: add random: true
            scale: {start: 0.01, end: 0.1},
            // TODO: Try: maxAliveParticles: 8,
            lifespan: 3500, maxAliveParticles:8,
            // TODO: Try: gravityY: -400,
            alpha: {start: 1, end: 0.1}, gravityY: -4000
        });
        
        my.vfx.walking = this.add.particles(my.sprite.player.x-30, my.sprite.player.y -250, "kenny-particles", {
            frame: ['smoke_03.png', 'smoke_09.png'],
            // TODO: Try: add random: true
            scale: {start: 0.01, end: 0.1},
            // TODO: Try: maxAliveParticles: 8,
            lifespan: 135, maxAliveParticles:8,
            // TODO: Try: gravityY: -400,
            alpha: {start: 1, end: 0.9}, gravityY: -40
        });
        my.vfx.stop();
        my.vfx.walking.stop();


    }

    update() {
        this.count += 1;
        if(cursors.left.isDown) {
            if(my.sprite.player.body.velocity.x > 0){ 
                my.sprite.player.body.setVelocityX(my.sprite.player.body.velocity.x - 20);
            }
            my.sprite.player.body.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            this.jankwalk += 1;
            if(this.jankwalk > 30 && my.sprite.player.body.blocked.down && my.sprite.player.body.velocity.x < 0) {
                this.jankwalk = 0;    
                this.sound.play('walker');
            }
                
            my.vfx.startFollow(my.sprite.player, my.sprite.player.x, my.sprite.player.y -3000, false);
            my.vfx.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }
        } else if(cursors.right.isDown) {
            if(my.sprite.player.body.velocity.x < 0){ 
                my.sprite.player.body.setVelocityX(my.sprite.player.body.velocity.x + 20);
            }
            my.sprite.player.body.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            this.jankwalk += 1;
            my.sprite.player.anims.play('walk', true);
            if(this.jankwalk > 30 && my.sprite.player.body.blocked.down && my.sprite.player.body.velocity.x > 0) {
                this.jankwalk = 0;    
                this.sound.play('walker');
            }
            my.vfx.walking.startFollow(my.sprite.player, 0, 0, false);

            my.vfx.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }
        } else {
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setDragX(this.DRAG-900);
            my.sprite.player.anims.play('idle');            
            my.vfx.walking.stop();
            my.vfx.stop();
        }
        
        if(!my.sprite.player.body.blocked.down) {
            this.jankwalk = 0;
            this.inair = true;            
            my.vfx.walking.stop();
            my.vfx.stop();
            my.sprite.player.body.setMaxVelocityX(350);
            my.sprite.player.anims.play('jump');
        }
        else{
            this.doublejump = true;
            if(this.inair){
                this.sound.play('lander');  
                this.add.particles(my.sprite.player.body.x+30, my.sprite.player.body.y+30, "kenny-particles", {
                    frame: ['dirt_02.png'],
                    // TODO: Try: add random: true
                    scale: {start: 0.1, end: 0.4}, 
                    // TODO: Try: maxAliveParticles: 8,
                    lifespan: 200, duration: 200, maxAliveParticles: 8,
                    // TODO: Try: gravityY: -400,
                    alpha: {start: 1, end: 0}, gravityY: -600
                });
                this.inair = false;
                my.sprite.player.body.setMaxVelocityX(400);
                my.sprite.player.body.setVelocityX(my.sprite.player.body.velocity.x / 2);
                
            }
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            this.sound.play('jumper');
            my.sprite.player.body.setAccelerationX(this.ACCELERATION / 2);
        }
        
        if(this.doublejump && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.doublejump = false;
            this.sound.play('jumper');
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }
    }
}