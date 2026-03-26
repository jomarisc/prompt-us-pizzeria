export class PizzaStation extends Phaser.GameObjects.Container {
    constructor(scene,x, y) {
        super(scene, x, y);
        scene.add.existing(this);

        const box = scene.add.rectangle(0, 0, 800, 1000, 0xffffff);
        box.setOrigin(0,0);
    
        const end = scene.add.circle(400, 500, 60,0x62a858);
        end.setStrokeStyle(5, 0x000000);
 
        const circle = scene.add.circle(20, 20, 50, 0x000000);
        circle.setInteractive({ draggable: true });

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            dragX = Phaser.Math.Snap.To(dragX, 20);
            dragY = Phaser.Math.Snap.To(dragY, 20);

            gameObject.setPosition(dragX, dragY)
        });
        
        scene.input.on('dragend', (pointer, gameObject) => {
            const x = gameObject.x;
            const y = gameObject.y;
            if (x === 400 && y === 500) {
                gameObject.setFillStyle(0xff0000);
            }
            else {
                gameObject.setFillStyle(0x000000)
            }
        })
        

        this.add([box, end, circle]);
    }

}
