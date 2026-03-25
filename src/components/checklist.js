export class Checklist extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this);

        const box = scene.add.rectangle(0, 0, 650, 1000, 0xd3d3d3);
        box.setOrigin(0, 0);

        const label = scene.add.text(20, 20, 'This is where the task list will go', {
            fontSize: '20px',
            color: '#000000',
            wordWrap: { width: 210 }
        });

        this.add([box, label]);
    }
}