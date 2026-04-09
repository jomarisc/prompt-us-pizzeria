import { ContinueBox } from "./ContinueBox.js";
export class Checklist extends Phaser.GameObjects.Container {
    // Removed 'checkboxes' from arguments since it's generated dynamically
    constructor(scene, x, y, width, height, listData, newKey) {
        super(scene, x, y);
        
        this.listData = listData;
        this.scene = scene; 
        this.checkboxes = []; // Initialize empty array
        this.ourtextlines = []; // same thing as text boxes but this way can access each text line invidually. 

        this.isClickable = true;

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
        this.tmpY = 380;
        this.listData['entries'].forEach((entry, index) => {
            // entry is {"Text here": true/false}
            const text = Object.keys(entry)[0];
            const isUnsafe = entry[text]; // This gets the true/false value

            this.createItem(30, this.tmpY, text, isUnsafe, index);
        });

        let continueBox = new ContinueBox(this.scene, 960, 540, newKey);
        this.continueBox = continueBox;
        this.continueBox.displayBox(false);
        this.add(this.continueBox);

        this.createDeliveryButton();
        // Create the "Incorrect" text but keep it hidden first

        this.wastedText = this.scene.add.text(377, 1000, 'Incorrect, rearrange toppings',{ 
                fontSize: '40px', 
                color: '#d10b0b', 
                fontFamily: 'Special Elite' 

                }).setOrigin(0.5).setAlpha(0);
            this.add(this.wastedText);
    }

    highlightText(index, bool) {
        if (this.ourtextlines[index] && bool) {
            this.ourtextlines[index].setBackgroundColor('#ffff00');
        } else {
            this.ourtextlines[index].setBackgroundColor('transparent');
        }
    }

    createItem(x, y, tmpText, isUnsafe, index) {
        const box = this.scene.add.rectangle(x, y, 30, 30, 0xffffff);
        box.setOrigin(0, 0);
        box.setStrokeStyle(2, 0x401801);

        // Custom properties to help with validation
        box.isUnsafe = isUnsafe; 
        box.index = index;

        //This is where our prompt is defined, we can use the 'tmpText' variable to set the text for each item

        this.checkboxes.push(box);
        let tmp = this.scene.add.text(x + 60, y + 5, tmpText, {
            fontSize: '30px',
            color:'#401801',
        })
        tmp.setWordWrapWidth(600);

        this.ourtextlines.push(tmp); // stores our text line in a array
        //this.ourtextlines[0].setBackgroundColor('#ffff00'); // this should change its color


        this.tmpY = (y + tmp.height);
        // console.log(tmpText);
        // console.log(tmp.width);
        // console.log(tmp.height);
        this.add(tmp);
        
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

        if (!this.isClickable) return;
        this.isClickable = false;

        let isCorrect = this.ValidChecklist();

        if (!isCorrect) {
            this.wastedText.setAlpha(1);
            this.scene.time.delayedCall(2800, () => {
                this.scene.tweens.add({
                    targets: this.wastedText,
                    alpha: 0,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                            this.isClickable = true;
                    }
                });
         });
        } else {
            this.wastedText.setAlpha(0);

            this.isClickable = true;

        }
        //   this.wastedText.setAlpha(isCorrect ? 0 : 1)
          this.ValidChecklist() ? console.log('You did it!') : console.log('Kinda sus...');
          this.continueBox.displayBox(this.ValidChecklist());
        });
    }
}