export class Topping extends Phaser.GameObjects.Container {
    constructor(scene, x, y, radius, type, checklistItem) {
        super(scene, x, y);

        this.checklistItem = checklistItem;
        this.type = type;

        // 1. The visual circle
        this.circle = scene.add.arc(0, 0, radius, 0, 360, false, 0xffffff, 1);
        this.circle.setStrokeStyle(5, 0x401801);

        // 2. The emoji
        this.emoji = scene.add.text(0, 6, this.type, {
            fontSize: `${radius+24}px`
        }).setOrigin(0.5);

        this.add([this.circle, this.emoji]);

        // 3. Define the Hit Area for dragging
        // We create a geometric circle that tells Phaser where the 'mouse' can click
        const hitArea = new Phaser.Geom.Circle(0, 0, radius);
        this.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
        
        // 4. Tell the scene this specific object is draggable
        scene.input.setDraggable(this);

        scene.add.existing(this);
    }

    // Since 'setFillStyle' doesn't exist on Containers, we redirect it to the circle
    setFillStyle(color) {
        this.circle.setFillStyle(color);
    }
}