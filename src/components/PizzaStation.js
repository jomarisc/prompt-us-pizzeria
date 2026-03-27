import { Topping } from "./topping.js";
export class PizzaStation extends Phaser.GameObjects.Container {
    constructor(scene,x, y, checklist) {
        super(scene, x, y);
        scene.add.existing(this);
        this.checklist = checklist

        // A box container for the actual pizza station
        const box = scene.add.rectangle(0, 0, 835, 950, 0xffffff);
        box.setOrigin(0,0);
        box.setStrokeStyle(5, 0x000000);
        
        const trash = scene.add.rectangle(418, 115, 800, 200, 0x8a8a8a);
        trash.setStrokeStyle(5,0x000000);
    
        // Our pizza that'll house the toppings
        const end = scene.add.circle(400, 500, 200,0x62a858);
        end.setStrokeStyle(5, 0x000000);
        
        // Sample topping
        // const circle = scene.add.circle(100, 850, 50, 0x000000);
        // circle.setInteractive({ draggable: true });
        // circle.setStrokeStyle(5, 0x000000);

        // const circle2 = scene.add.circle(200, 850, 50, 0x000000);
        // circle2.setInteractive({ draggable: true });
        // circle2.setStrokeStyle(5, 0x000000);

        let topping1 = new Topping(scene, 100, 850, 50, 0);
        this.topping1 = topping1;
        let topping2 = new Topping(scene, 250, 850, 50, 1);
        this.topping2 = topping1;

        // Using Math.Snap to easily move our toppings to the pizza
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            dragX = Phaser.Math.Snap.To(dragX, 64);
            dragY = Phaser.Math.Snap.To(dragY, 64);

            gameObject.setPosition(dragX, dragY)
        });
        
        // Allows to move any object that has 'draggable' set to true.
        scene.input.on('dragend', (pointer, gameObject) => {
            const x = gameObject.x;
            const y = gameObject.y;
            const targetBoxIndex = gameObject.checklistItem;
            const targetBox = this.checklist.checkboxes[targetBoxIndex];
            // 1. Dropped on Pizza (Validation Logic)
            if (x < 601 && x > 199 && y < 701 && y > 299) {
                if (targetBox.isUnsafe) { //WRONG: This is PII
                    gameObject.setFillStyle(0xff0000); // Topping turns RED
                    this.checklist.CheckBox(targetBoxIndex, 0xff0000);
                } else { //CORRECT: This is good to go.
                    gameObject.setFillStyle(0x00ff00); // Topping turns GREEN
                    this.checklist.CheckBox(targetBoxIndex, 0x00ff00);
                }
            } 
            // 2. Dropped in Trash
            else if (x < 819 && x > 17 && y < 216 && y > 14) {
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
                gameObject.setFillStyle(0x000000); // Reset topping to black
                if (this.checklist) {
                    // Reset the specific checkbox to white
                    this.checklist.CheckBox(gameObject.checklistItem, 0xffffff);
                }
            }
        })
        

        this.add([box,trash, end, topping1, topping2]);
    }

}
