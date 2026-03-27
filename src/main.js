import { Pizzeria } from './scenes/Pizzeria.js';

const config = {
    type: Phaser.AUTO,
    title: 'Prompt Us Pizzeria',
    description: 'A educational prompt-engineering microgame.',
    parent: 'game-container',
    width: 1920,
    height: 1080,
    backgroundColor: '#a53b3b',
    pixelArt: false,
    antialias: true,
    scene: [
        Pizzeria
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            