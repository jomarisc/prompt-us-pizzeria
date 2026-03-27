import { Topping } from "./topping.js";
export class PizzaStation extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, checklist) {
        super(scene, x, y);
        scene.add.existing(this);
        this.checklist = checklist
        this.width = width;
        this.height = height;
        
        const pizza = scene.add.image(530, 400, 'the-pizza').setScale(1.25);
        pizza.setOrigin(0.5);

        // A box container for the actual pizza station
        const box = scene.add.rectangle(0, 0, this.width, this.height, 0xF8F0E5);
        box.setOrigin(0,0);
        box.setStrokeStyle(5, 0x401801);
        // box.setAlpha(0.95);

        const trashIcon = scene.add.image(this.width - 30, this.height - 20, 'trash-can');
        trashIcon.setScale(0.2);
        trashIcon.setDepth(1);
        trashIcon.setOrigin(1,1);

        this.add([box, trashIcon, pizza]);

        const entries = this.checklist.listData['entries'];
        const emojiIcons = this.checklist.listData['toppings'];
        
        this.toppings = []; // Array to keep track of topping objects

        entries.forEach((entry, index) => {
            // Calculate position: 2 rows of 4 toppings at the bottom
            const xPos = 100 + (index % 4) * 150;
            const yPos = index < 4 ? 800 : 900;
            
            // Get the emoji from the 'toppings' array in JSON
            const emoji = emojiIcons[index];

            // Create the topping. 'index' links it to the specific checklist item
            let topping = new Topping(scene, xPos, yPos, 40, emoji, index);

            this.toppings.push(topping);
            this.add(topping); // Add to container
        });

        // Using Math.Snap to easily move our toppings to the pizza
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            // Check if the object being dragged is one of our toppings
            if (gameObject instanceof Topping) {
                // Snap to grid for that satisfying 'click' into place
                gameObject.x = Phaser.Math.Snap.To(dragX, 32);
                gameObject.y = Phaser.Math.Snap.To(dragY, 32);
            }
        });
        
        let correct = 0x00fffe;
        let incorrect = 0xfeffff;

        // Allows to move any object that has 'draggable' set to true.
        scene.input.on('dragend', (pointer, gameObject) => {
            const x = gameObject.x;
            const y = gameObject.y;
            const targetBoxIndex = gameObject.checklistItem;
            const targetBox = this.checklist.checkboxes[targetBoxIndex];
            // 1. Dropped on Pizza (Validation Logic)
            if (x < 850 && x > 250 && y < 700 && y > 100) {
                if (targetBox.isUnsafe) {
                    gameObject.setFillStyle(incorrect); // Now calls our custom helper
                    this.checklist.CheckBox(targetBoxIndex, incorrect);
                } else {
                    gameObject.setFillStyle(correct);
                    this.checklist.CheckBox(targetBoxIndex, correct);
                }
            } 
            // 2. Dropped in Trash
            else if (x < this.width - 20 && x > this.width - 210 && y < this.height && y > this.height - 280) {
                // TODO - check if trash is the correct assignment
                if (targetBox.isUnsafe) {
                    gameObject.setFillStyle(correct);
                    this.checklist.CheckBox(targetBoxIndex, correct);
                } else {
                    gameObject.setFillStyle(incorrect);
                    this.checklist.CheckBox(targetBoxIndex, incorrect);
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
    }

}
