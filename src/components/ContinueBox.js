export class ContinueBox extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        scene.add.existing(this);
        
        const box = scene.add.rectangle(0, 0, 750, 200, 0x058800);
        box.setStrokeStyle(5, 0x401801);
        let message = scene.add.text(0, 0, 'SUCCESS', {
            fontFamily: 'Special Elite',
            fontSize: '72px',
            fontStyle: 'italic'
        }).setOrigin(0.5);
        
        this.add([box, message]);
        
    }
    displayBox(passBool){
        this.setActive(passBool);
        this.setVisible(passBool);
    }

}