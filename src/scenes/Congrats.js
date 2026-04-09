export class Congrats extends Phaser.Scene{
    constructor() {
        super('Congrats');
    }

    preload() {

    }

    create() {
        this.add.text (960,250, 'Congratulations!', {
            fontFamily: 'Special Elite',
            fontSize: '120px',
            // fontStyle: 'italic'
        }).setOrigin(0.5)

    }

    update() {}
}