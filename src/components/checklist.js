
//This is where we have our class container 
export class Checklist extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        
        this.scene = scene; // keeps a reference to the scene so we can add more things to it later if we want to

        scene.add.existing(this); // this is where we add the checklist to the scene, and it displays the checklist on the screen 

        // bring to front of the page we need this becuase we want the checklist to be on top of everything else, so we set the depth to a higggggh number
        this.setDepth(10);

        // background panel for the checklist 
        const bg = this.scene.add.rectangle(0, 0, 550, 950, 0xd3d3d3);
        bg.setOrigin(0, 0);  // left corner so that it aligns with the checklist items suff

        this.add(bg); // this moves the background to the container so it moves with the checlist siff 

        // simple items for the checklist, we can add more items as needed or not up to you
        this.createItem(20, 20, 'Make pizza');
        this.createItem(20, 70, 'Serve customer');
        this.createItem(20, 120, 'Clean table');
        this.createItem(20, 170, 'excute order 66'); // added a fun item to the checklist, feel free to remove it if you want
        this.createItem(20, 220, 'commit code');
    }

    createItem(x, y, text) {
        const box = this.scene.add.rectangle(x, y, 30, 30, 0xffffff); // this is the box for the checklist item it creates the box
        box.setOrigin(0, 0);        //this is where we set the origin of the box to the top left corner, so it aligns with the text
        box.setStrokeStyle(2, 0x000000); // this is where we set the stroke style(border) of the box, it gives it a border so it looks nicer yay!

        const label = this.scene.add.text(x + 50, y, text, { // moves the text to the right by 50
            fontSize: '30px',
            color: '#000000'
        });

        let checked = false; // you can use this to keep track if the item is checked or not

        box.setInteractive({ useHandCursor: true }); // we can click on the box and have the mickey mouse hand cursor thing

        box.on('pointerdown', () => { // this is where we listen for a click on the box and this it toggles to a checked green box.
            checked = !checked;

            box.setFillStyle(checked ? 0x00ff00 : 0xffffff); // change colors of the box here.
        });

        this.add([box, label]); // this is adding the box and the label to the conatiner so they can move together 
    }
}