export class Checklist extends Phaser.GameObjects.Container {
    // Removed 'checkboxes' from arguments since it's generated dynamically
    constructor(scene, x, y, width, height, listData) {
        super(scene, x, y);
        
        this.listData = listData;
        this.scene = scene; 
        this.checkboxes = []; // Initialize empty array

        this.width = width;
        this.height = height;

        scene.add.existing(this); 
        this.setDepth(10);


        const bg = this.scene.add.rectangle(0, 0, this.width, this.height, 0xF8F0E5);
        bg.setOrigin(0, 0);  
        this.add(bg); 

        let title = this.scene.add.text(400, 300, this.listData['title'], { 
            fontSize: '30px',
            color: '#401801',
            wordWrap: { width: 800 }
        }).setOrigin(0.5);
        this.add(title); 

        // Dynamically create items based on the "entries" array in JSON
        let startingY = 380;
        this.listData['entries'].forEach((entry, index) => {
            // entry is {"Text here": true/false}
            const text = Object.keys(entry)[0];
            const isUnsafe = entry[text]; // This gets the true/false value

            this.createItem(30, startingY + (index * 60), text, isUnsafe, index);
        });

        this.createDeliveryButton();
        // Create the "Incorrect" text but keep it hidden first

        this.wastedText = this.scene.add.text(377, 1000, 'Incorrect, rearrange toppings',{ 
                fontSize: '40px', 
                color: '#d10b0b', 
                fontFamily: 'Special Elite' 

                }).setOrigin(0.5).setAlpha(0);
            this.add(this.wastedText);
    }

    createItem(x, y, text, isUnsafe, index) {
        const box = this.scene.add.rectangle(x, y, 30, 30, 0xffffff);
        box.setOrigin(0, 0);
        box.setStrokeStyle(2, 0x401801);

        // Custom properties to help with validation
        box.isUnsafe = isUnsafe; 
        box.index = index;

        const label = this.scene.add.text(x + 60, y + 5, text, { 
            fontSize: '24px',
            color: '#401801'
        });

        this.checkboxes.push(box);
        this.add([box, label]); 
    }

    CheckBox(boxNumber, colorString) { 
        if (this.checkboxes[boxNumber]) {
            this.checkboxes[boxNumber].setFillStyle(colorString);
        }
    }

    ValidChecklist() {
        return this.checkboxes.every(checkbox => 
            checkbox.fillColor === 0xfffffe
        );
    }

    createDeliveryButton() {
        let button = this.scene.add.rectangle(400, 950, 500, 80 , 0x8C3A3A).setDepth(13);
        button.setStrokeStyle(3, 0x401801);
        this.scene.add.text(400, 950, 'DELIVER', {
            fontSize: '38px',
            color: '#F8F0E5',
            fontFamily: 'Special Elite',
            letterSpacing: 6
        }).setOrigin(0.5).setDepth(14);

        button.setInteractive({ useHandCursor: true });
        button.on('pointerover', () => button.setFillStyle(0xa84a4a));
        button.on('pointerout', () => button.setFillStyle(0x8C3A3A));
        button.on('pointerdown', () => {
            let isCorrect = this.ValidChecklist();
            this.wastedText.setAlpha(isCorrect ? 0 : 1)
            this.ValidChecklist() ? console.log('You did it!') : console.log('Kinda sus...');
        });
    } 
}