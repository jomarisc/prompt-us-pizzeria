export class Congrats extends Phaser.Scene{
    constructor() {
        super('Congrats');
    }

    preload() {
        this.load.image('the-pizza', './assets/pizza.png');

    }

    create() {
        this.add.text (960,250, 'Congratulations!', {
            fontFamily: 'Special Elite',
            fontSize: '120px',
        }).setOrigin(0.5);

        this.add.text(960, 400, 'Now here is your pizza!',{
            fontFamily: 'Special Elite',
            fontSize: '50px'
        }).setOrigin(0.5);

        this.add.image(960, 750, 'the-pizza').setScale(0.15).setOrigin(0.5);

    }


    update() {}
}