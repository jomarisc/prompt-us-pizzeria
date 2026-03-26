export class PizzaStation extends Phaser.GameObjects.Container {
    constructor(scene,x, y) {
        super(scene, x, y);
        scene.add.existing(this);

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
        const circle = scene.add.circle(100, 850, 50, 0x000000);
        circle.setInteractive({ draggable: true });
        circle.setStrokeStyle(5, 0x000000);

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
            if (x < 601 && x > 199 && y < 701 && y > 299) {
                gameObject.setFillStyle(0x00aaff);
            } else if (x < 419 && x > 17 && y < 216 && y > 14 ) {
                gameObject.setFillStyle(0xff0000);
            }
            else {
                gameObject.setFillStyle(0x000000)
            }
        })
        

        this.add([box,trash, end, circle]);
    }

}
