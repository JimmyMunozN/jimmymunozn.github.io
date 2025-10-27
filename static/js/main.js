import { pulseAnimation } from "./animation.js";
import { projectCarousel } from "./projects.js";

const vwToPx = (vw) => (vw * window.innerWidth) / 100;

const SECTION_NAMES = ['center', 'home', 'about', 'projects', 'contact'];
const TRANSITION_TIME = 500;
const BG_WIDTH_VW = 205;
const BG_HEIGHT_VW = 130;
let actualTarget = 0;
let isScrolling = false;

function animationScroll(target) {
    const targets = {
        'home':      { x: BG_WIDTH_VW / 2, y: 0 },
        'about':     { x: 0, y: BG_HEIGHT_VW / 2 },
        'projects':  { x: BG_WIDTH_VW, y: BG_HEIGHT_VW / 2 },
        'contact':   { x: BG_WIDTH_VW / 2, y: BG_HEIGHT_VW },
        'center':    { x: BG_WIDTH_VW / 2, y: BG_HEIGHT_VW / 2 } 
    };

    const targetVW = targets[target];
    if (!targetVW) return;

    const scrollX = vwToPx(targetVW.x) - (window.innerWidth / 2);
    const scrollY = vwToPx(targetVW.y) - (window.innerHeight / 2);

    window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth'
    });
}

async function scrollToTarget(target) {
    if (actualTarget != 'center') {
        animationScroll('center');
        await new Promise(resolve => setTimeout(resolve, TRANSITION_TIME + 50));
    }
    animationScroll(target);
    actualTarget = SECTION_NAMES.indexOf(target);
    await new Promise(resolve => setTimeout(resolve, TRANSITION_TIME + 50));
}


async function loadContent(pageName) {
    const contentDiv = document.getElementById('content');
    const url = `/get-content/${pageName}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error al cargar la página: ${response.status}`);
        }

        const htmlContent = await response.text();

        await (contentDiv.innerHTML = htmlContent);

        if (pageName === 'projects') {
             projectCarousel();
        }

    } catch (error) {
        console.error("Fallo al cargar el contenido:", error);
        contentDiv.innerHTML = `<p>Lo sentimos, no pudimos cargar la sección de ${pageName}.</p>`;
    }
}


async function handleVerticalScroll(event) {
    event.preventDefault(); 

    if (isScrolling) {
        return;
    }
    
    isScrolling = true; 
    
    const direction = event.deltaY > 0 ? 1 : -1;
    let newIndex = actualTarget + direction;

    if (newIndex >= 0 && newIndex < SECTION_NAMES.length) {
        
        const target = SECTION_NAMES[newIndex];

        actualTarget = newIndex;

        pulseAnimation(target);

        await loadContent(target); 
        
        await scrollToTarget(target);

        isScrolling = false; 
    } else {
        isScrolling = false; 
    }
}


document.addEventListener('DOMContentLoaded', () => {
    pulseAnimation('center');
    window.addEventListener('wheel', handleVerticalScroll, { passive: false });
    setTimeout(() => {
        scrollToTarget('center');
        actualTarget = SECTION_NAMES.indexOf('center');
    }, 200); 
    
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const text = e.target.textContent.toLowerCase().trim();
            let target;

            if (text.includes('home')) target = 'home';
            else if (text.includes('about')) target = 'about';
            else if (text.includes('portfolio')) target = 'projects';
            else if (text.includes('contact')) target = 'contact';

            const pageName = e.target.getAttribute('data-page'); 
            
            if (pageName) {
                loadContent(pageName);
            }
            
            if (target) {
                scrollToTarget(target);
                pulseAnimation(target);
            }
        });
    });

    document.querySelector('#navbar button').addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTarget('center');
        pulseAnimation('center');
    });
});


