import { Checklist } from '../components/checklist.js';
import { PizzaStation } from '../components/PizzaStation.js';

export class Pizzeria extends Phaser.Scene {
    constructor() {
        super('Pizzeria');
    }

    preload() {
        this.load.image('pizza-bg', './assets/pizza-bg.png');
        this.load.json('email-data', './src/checklist_data/email.json');
        this.load.json('grant-proposal', './src/checklist_data/grant.json');
    }

    create() {
        const email_data = this.cache.json.get('email-data');
        const grant_data = this.cache.json.get('grant-proposal');

        this.add.image(960, 540, 'pizza-bg').setDepth(0);

        this.add.text(960, 540, 'Welcome to the pizzeria.', {
            fontSize: '64px',
            color: '#000000'
        }).setOrigin(0.5);

        this.checklist = new Checklist(this, 20, 20, email_data);
        this.pizzastation = new PizzaStation(this, 900, 20, this.checklist);
    }
      update() {
    }
}