import { Checklist } from '../components/checklist.js';
import { PizzaStation } from '../components/PizzaStation.js';

export class Pizzeria extends Phaser.Scene {
    constructor() {
        super('Pizzeria');
    }

    preload() {
        this.load.image('pizza-bg', './assets/pizza-bg.png');
    }

    create() {
        this.add.image(960, 540, 'pizza-bg');

        this.add.text(960, 540, 'Welcome to the pizzeria.', {
            fontSize: '64px',
            color: '#000000'
        }).setOrigin(0.5);

        this.checklist = new Checklist(this,20,20);
        this.pizzastation = new PizzaStation(this, 800, 0);
    }

    update() {
    }
}