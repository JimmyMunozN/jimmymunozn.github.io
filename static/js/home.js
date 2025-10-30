import { animate, svg, stagger } from 'https://esm.sh/animejs';
import { componentAnimation } from "./animation.js";

export async function homeStart() {
    componentAnimation('home', '0', '20rem');
    await new Promise(resolve => setTimeout(resolve, 520));
    componentAnimation('.homeAnimation', '0', '20rem');
    animateStatistics();
    animateStatus();
    animateData();
}

function animateStatus() {
    animate(svg.createDrawable('#status path'), {
        draw: ['0 0', '0 1', '1  1'],
        ease: 'inOutQuad',
        duration: 1000,
        delay: stagger(200),
        loop: true,
        alternate: true
    });
}

function animateStatistics() {
    animate(svg.createDrawable('#statistics path'), {
        draw: ['0 0', '0 1', '1  1'],
        ease: 'inOutQuad',
        duration: 2000,
        delay: stagger(400),
        loop: true,
        alternate: true
    });
}

function animateData() {
    animate(svg.createDrawable('#data'), {
        draw: ['0 0', '0 1', '1  1'],
        ease: 'inOutQuad',
        duration: 4000,
        loop: true,
        alternate: true
    });
}
