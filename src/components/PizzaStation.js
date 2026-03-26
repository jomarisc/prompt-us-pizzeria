export class PizzaStation extends Phaser.GameObjects.Container {
    constructor(scene,x, y) {
        super(scene, x, y);
        scene.add.existing(this);

        const box = scene.add.rectangle(0, 0, 800, 1000, 0xfffff);
        box.setOrigin(0,0);
    
        const circle = scene.add.circle(20,20, 50, 0x000000);
        circle.setInteractive({ draggable: true });
        circle.on('drag', (pointer, dragX, dragY) => circle.setPosition(dragX, dragY));

        this.add([box, circle]);
    }

}
