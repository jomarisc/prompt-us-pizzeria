export class Pizzeria extends Phaser.Scene {
    constructor() {
        super('Pizzeria');
    }

    preload(){

    }

    create(){
        this.add.text(960, 540, 'Welcome to the pizzeria.', {
            fontSize: '64px',
            fill: '#ce4949'
        }).setOrigin(0.5);
    }

    update(){

    }
}