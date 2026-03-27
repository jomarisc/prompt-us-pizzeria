export class Checklist extends Phaser.GameObjects.Container {
    // Removed 'checkboxes' from arguments since it's generated dynamically
    constructor(scene, x, y, listData) {
        super(scene, x, y);
        
        this.listData = listData;
        this.scene = scene; 
        this.checkboxes = []; // Initialize empty array

        scene.add.existing(this); 
        this.setDepth(10);

        const bg = this.scene.add.rectangle(0, 0, 835, 950, 0xd3d3d3);
        bg.setOrigin(0, 0);  
        this.add(bg); 

        let title = this.scene.add.text(20, 20, this.listData['title'], { 
            fontSize: '24px',
            color: '#000000',
            wordWrap: { width: 800 }
        });
        this.add(title); 

        // Dynamically create items based on the "entries" array in JSON
        let startingY = 100;
        this.listData['entries'].forEach((entry, index) => {
            // entry is {"Text here": true/false}
            const text = Object.keys(entry)[0];
            const isUnsafe = entry[text]; // This gets the true/false value

            this.createItem(20, startingY + (index * 60), text, isUnsafe, index);
        });
    }

    createItem(x, y, text, isUnsafe, index) {
        const box = this.scene.add.rectangle(x, y, 30, 30, 0xffffff);
        box.setOrigin(0, 0);
        box.setStrokeStyle(2, 0x000000);

        // Custom properties to help with validation
        box.isUnsafe = isUnsafe; 
        box.index = index;

        const label = this.scene.add.text(x + 50, y + 5, text, { 
            fontSize: '22px',
            color: '#000000'
        });

        this.checkboxes.push(box);
        this.add([box, label]); 
    }

    CheckBox(boxNumber, colorString) { 
        if (this.checkboxes[boxNumber]) {
            this.checkboxes[boxNumber].setFillStyle(colorString);
        }
    }
}