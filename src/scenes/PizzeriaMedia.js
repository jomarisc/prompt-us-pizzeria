import { Checklist } from '../components/checklist.js';
import { PizzaStation } from '../components/PizzaStation.js';

export class PizzeriaMedia extends Phaser.Scene {
    constructor() {
        super('PizzeriaMedia');
    }

    preload() {
        this.load.image('pizza-bg', './assets/pizza-bg.png');
        this.load.image('pizza-icon', './assets/pizza-icon.png');
        this.load.image('the-pizza', './assets/the-pizza.png');
        this.load.image('trash-can', './assets/trash.png');
        this.load.json('media-data', './src/checklist_data/social_media.json');
    }

    create() {
        const media_data = this.cache.json.get('media-data');

        this.add.image(960, 540, 'pizza-bg').setDepth(0);
        this.add.image(580, 140, 'pizza-icon').setDepth(11).setScale(0.3).setOrigin(0.5);

        this.add.text(320, 140, 'Prompt Us\nPizzeria', {
            fontFamily: 'Special Elite',
            fontSize: '72px',
            color: '#8C3A3A',
            fontStyle:'italic'
        }).setOrigin(0.5).setDepth(11);

        this.add.rectangle(420,260,700,6, 0x8C3A3A).setDepth(11).setOrigin(0.5);

        this.checklist = new Checklist(this, 20, 20, 800, 1040, media_data, 'Congrats');
        this.pizzastation = new PizzaStation(this, 840, 20, 1060, 1040, this.checklist);
    }
      update() {
    }
}