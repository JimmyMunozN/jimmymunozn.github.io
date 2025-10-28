import { animate, svg, stagger } from 'https://esm.sh/animejs';

let currentAnimation = null;

const PATH_SELECTORS = {
    'home':      '#path_flow_top',
    'about':     '#path_flow_left',
    'projects':  '#path_flow_right',
    'contact':   '#path_flow_bottom',
    'start':    ['#path_flow_left', '#path_flow_right', '#path_flow_bottom', '#path_flow_top']
};

const ALL_PATHS = Object.values(PATH_SELECTORS);


function stopAnimation() {
    if (currentAnimation) {
        currentAnimation.pause();
        currentAnimation.seek(0);
        currentAnimation = null;
    }

    animate(svg.createDrawable(ALL_PATHS), {
        draw: '0 0',
        duration: 1,
        delay: 0
    });
}

export async function pulseAnimation(target) {
    
    const animationTarget = PATH_SELECTORS[target];
    stopAnimation();

    let durationPulse = 1000;
    
    if (target === 'home') {
        durationPulse = 4000;
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));

    if (target === 'start') {
        
        const centerTargets = PATH_SELECTORS['start']

        const baseDuration = 3000;

        currentAnimation = animate(svg.createDrawable(centerTargets), {
            draw: ['-0.1 -0.1', '-0.165 -0.15', '1 1'], 
            ease: 'linear',
            duration: baseDuration,
            loop: true,
        });
        
    } else if (target === 'home') {
        currentAnimation = animate(svg.createDrawable(animationTarget), {
                draw: ['0 0', '0.05 0.5', '1 1'],
                ease: 'linear',
                duration: durationPulse,
                delay: 100,
                loop: true
            });
    } else {
        durationPulse = 2300;
        currentAnimation = animate(svg.createDrawable(animationTarget), {
                draw: ['0 0', '0.05 0.5', '1 1'],
                ease: 'linear',
                duration: durationPulse,
                delay: 100,
                loop: true
            });
    }
};