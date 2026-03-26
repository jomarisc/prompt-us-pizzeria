export class Checklist extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        scene.add.existing(this);

        // bring to front
        this.setDepth(10);

        // background panel
        const bg = this.scene.add.rectangle(0, 0, 550, 950, 0xd3d3d3);
        bg.setOrigin(0, 0);

        this.add(bg);

        // simple items
        this.createItem(20, 20, 'Make pizza');
        this.createItem(20, 70, 'Serve customer');
        this.createItem(20, 120, 'Clean table');
        this.createItem(20, 170, 'excute order 66'); 
        this.createItem(20, 220, 'commit code');
    }

    createItem(x, y, text) {
        const box = this.scene.add.rectangle(x, y, 30, 30, 0xffffff);
        box.setOrigin(0, 0);
        box.setStrokeStyle(2, 0x000000);

        const label = this.scene.add.text(x + 50, y, text, {
            fontSize: '30px',
            color: '#000000'
        });

        let checked = false;

        box.setInteractive({ useHandCursor: true });

        box.on('pointerdown', () => {
            checked = !checked;

            box.setFillStyle(checked ? 0x00ff00 : 0xffffff);
        });

        this.add([box, label]);
    }
}