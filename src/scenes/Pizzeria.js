export class Pizzeria extends Phaser.Scene {
    constructor() {
        super('Pizzeria');
    }

    preload(){
        this.load.image('pizza-bg', './assets/pizza-bg.png');
    }

    create(){
        this.add.image(960, 540, 'pizza-bg');

        this.add.text(960, 540, 'Welcome to the pizzeria.', {
            fontSize: '64px',
            fill: '#ce4949'
        }).setOrigin(0.5);
    }

    update(){

    }
}