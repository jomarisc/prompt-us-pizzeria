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

        const box2 = scene.add.rectangle(0, 0, 750, 100, 0x50b030 ).setY(170);
        box2.setStrokeStyle(5, 0x401801);
        let message2 = scene.add.text(0, 0, 'CONTINUE', {
            fontFamily: 'Special Elite',
            fontSize: '32px',
            fontStyle: 'italic'
        }).setOrigin(0.5).setY(170);

        
        this.add([box, message, box2, message2]);
        
    }
    displayBox(passBool){
        this.setActive(passBool);
        this.setVisible(passBool);
    }

}