document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    return (
        rect.top <= windowHeight * 0.75 &&  
        rect.bottom >= windowHeight * 0.25   
    );
}

function checkFadeElements() {
    const fadeElements = document.querySelectorAll('.fade-element, .fade-left, .fade-right');
    
    fadeElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
    
    const separators = document.querySelectorAll('.separator');
    
    separators.forEach(sep => {
        if (isElementInViewport(sep)) {
            sep.classList.add('visible');
        } else {
            sep.classList.remove('visible');
        }
    });
}

checkFadeElements();

window.addEventListener('scroll', checkFadeElements);

window.addEventListener('resize', checkFadeElements);