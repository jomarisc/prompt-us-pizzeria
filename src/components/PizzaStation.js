import { Topping } from "./topping.js";
export class PizzaStation extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, checklist) {
        super(scene, x, y);
        scene.add.existing(this);
        this.checklist = checklist
        this.width = width;
        this.height = height;

        // A box container for the actual pizza station
        const box = scene.add.rectangle(0, 0, this.width, this.height, 0xF8F0E5);
        box.setOrigin(0,0);
        box.setStrokeStyle(5, 0x401801);
        // box.setAlpha(0.95);
        
        // const trash = scene.add.rectangle(this.width - 20, this.height - 20, 200, 200, 0x8a8a8a);
        // trash.setStrokeStyle(5,0x000000);
        // trash.setOrigin(1,1)
    
        // Our pizza that'll house the toppings
        const end = scene.add.circle(400, 500, 200,0x62a858);
        end.setStrokeStyle(5, 0x000000);

        let topping1 = new Topping(scene, 100, 850, 50, '🥥', 0);
        this.topping1 = topping1;

        let topping2 = new Topping(scene, 250, 850, 50, '🍅', 1);
        this.topping2 = topping2; // Fixed typo here (was topping1)

        const trashIcon = scene.add.image(this.width - 30, this.height - 20, 'trash-can');
        trashIcon.setScale(0.175);
        trashIcon.setDepth(1);
        trashIcon.setOrigin(1,1);

        // Using Math.Snap to easily move our toppings to the pizza
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // Check if the object being dragged is one of our toppings
            if (gameObject instanceof Topping) {
                // Snap to grid for that satisfying 'click' into place
                gameObject.x = Phaser.Math.Snap.To(dragX, 64);
                gameObject.y = Phaser.Math.Snap.To(dragY, 64);
            }
        });
        
        // Allows to move any object that has 'draggable' set to true.
        scene.input.on('dragend', (pointer, gameObject) => {
            const x = gameObject.x;
            const y = gameObject.y;
            const targetBoxIndex = gameObject.checklistItem;
            const targetBox = this.checklist.checkboxes[targetBoxIndex];
            // 1. Dropped on Pizza (Validation Logic)
            if (x < 601 && x > 199 && y < 701 && y > 299) {
                if (targetBox.isUnsafe) {
                    gameObject.setFillStyle(0xff0000); // Now calls our custom helper
                    this.checklist.CheckBox(targetBoxIndex, 0xff0000);
                } else {
                    gameObject.setFillStyle(0x00ff00);
                    this.checklist.CheckBox(targetBoxIndex, 0x00ff00);
                }
            } 
            // 2. Dropped in Trash
            else if (x < this.width - 20 && x > this.width - 210 && y < this.height && y > this.height - 220) {
                // TODO - check if trash is the correct assignment
                if (targetBox.isUnsafe) {
                    gameObject.setFillStyle(0x00ff00);
                    this.checklist.CheckBox(targetBoxIndex, 0x00ff00);
                } else {
                    gameObject.setFillStyle(0xff00000);
                    this.checklist.CheckBox(targetBoxIndex, 0xff0000);
                }
            }
            // 3. Dropped anywhere else - RESET TO WHITE
            else {
                gameObject.setFillStyle(0xffffff); // Reset topping to black
                if (this.checklist) {
                    // Reset the specific checkbox to white
                    this.checklist.CheckBox(gameObject.checklistItem, 0xffffff);
                }
            }
        })
        

        this.add([box, trashIcon, end, topping1, topping2]);
    }

}
