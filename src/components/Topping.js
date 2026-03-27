export class Topping extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, checklistItem) {
        // Must include 'scene' as the first argument
        super(scene, x, y, radius, 0, 360, false, 0x000000, 1);

        this.checklistItem = checklistItem;
        this.setStrokeStyle(5, 0x000000); 
        this.setInteractive({ draggable: true });
        
        // Add to the scene's top-level display list
        scene.add.existing(this);
    }
}