export async function portfolioStart() {
    const portfolio = document.querySelector('.portfolio');
    const techStackSection = document.querySelector('.techStack');
    portfolioContent(portfolio, techStackSection);
    projectCarousel();
    showSection(portfolio, techStackSection, '5% 20%', 0, '140vw', '120vw');
}

function showSection(sectionToShow, sectionToHide, showMargin, hideMargin, showLeft, hideLeft) {
    sectionToHide.style.opacity = 0;
    sectionToHide.style.margin = hideMargin;
    sectionToHide.style.left = hideLeft;
    sectionToHide.style.transform = 'scale(0)';
    sectionToHide.style.pointerEvents = 'none';

    setTimeout(() => {
        sectionToShow.style.opacity = '1';
        sectionToShow.style.transform = 'scale(1)';
        sectionToShow.style.margin = showMargin;
        sectionToShow.style.left = showLeft;
        sectionToShow.style.pointerEvents = 'auto';
    }, 200);
}

function portfolioContent(portfolio, techStackSection) {
    
    const projectButton = document.querySelector('.projectsButton');
    const techStackButton = document.querySelector('.techStackButton');

    projectButton.addEventListener('click', () => {
        showSection(portfolio, techStackSection, '5% 20%', 0, '140vw', '120vw');
    });

    techStackButton.addEventListener('click', () => {
        showSection(techStackSection, portfolio, '2.5% 10%', 0, '140vw', '130vw');
    });
}

function projectCarousel () {
    let amount = 6;
    var carousel = $(".carousel"),
        currdeg  = 0;

    const cube = document.getElementById('animationCube');

    const projects = carousel.find('.project');

    $(".next").on("click", { d: "n" }, rotate);
    $(".prev").on("click", { d: "p" }, rotate);
    
    function updateFrontProject() {
        let normalizedDeg = currdeg % 360;
        if (normalizedDeg < 0) {
            normalizedDeg += 360;
        }
        const anglePerProject = 360 / amount;

        let frontIndex = Math.round(normalizedDeg / anglePerProject);

        let actualFrontIndex = (amount - frontIndex) % amount;

        if (!projects.eq(actualFrontIndex).hasClass('b')) {
            cube.classList.remove('is-3d');
        }

        if (projects.eq(actualFrontIndex).hasClass('b')) {
            cube.classList.add('is-3d');
        }

        projects.removeClass('is-front');

        projects.eq(actualFrontIndex).addClass('is-front');
    }

    function rotate(e){
        if(e.data.d=="n"){
            currdeg = currdeg - (360/amount);
        }
        if(e.data.d=="p"){
            currdeg = currdeg + (360/amount);
        }
        
        let transformValue = `rotateY(${currdeg}deg)`;
        
        carousel.css({
            "transform": transformValue
        });

        setTimeout(updateFrontProject, 1000 / 2);
    }

    updateFrontProject();
}
