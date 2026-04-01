export class ContinueBox extends Phaser.GameObjects.Container{
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);
        
        const box = this.scene.add.rectangle(0,0, 500, 500, 0x058800);

        this.add([box]);
        
    }
    displayBox(passBool){
        this.setActive(passBool);
        this.setVisible(passBool);
    }

}