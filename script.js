// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

// Form submission handler (kept optional because the contact section may use an embedded form)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Simple image gallery hover effect (already in CSS, but can add more JS if needed)

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = '#000000';
    } else {
        header.style.backgroundColor = '#000000';
    }
});

// Portfolio carousel functionality
const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : [];
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateThumbnails = (currentThumbnail, targetThumbnail) => {
    currentThumbnail.classList.remove('current-thumbnail');
    targetThumbnail.classList.add('current-thumbnail');
};

const setSlidePositions = slides => {
    slides.forEach((slide, index) => {
        slide.style.left = slide.getBoundingClientRect().width * index + 'px';
    });
};

if (track && slides.length && nextButton && prevButton && thumbnails.length) {
    const positionSlides = () => setSlidePositions(slides);

    positionSlides();
    window.addEventListener('resize', positionSlides);

    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];
        const currentThumbnail = document.querySelector('.current-thumbnail');
        const nextThumbnail = thumbnails[slides.indexOf(nextSlide)];

        moveToSlide(track, currentSlide, nextSlide);
        if (currentThumbnail && nextThumbnail) {
            updateThumbnails(currentThumbnail, nextThumbnail);
        }
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
        const currentThumbnail = document.querySelector('.current-thumbnail');
        const prevThumbnail = thumbnails[slides.indexOf(prevSlide)];

        moveToSlide(track, currentSlide, prevSlide);
        if (currentThumbnail && prevThumbnail) {
            updateThumbnails(currentThumbnail, prevThumbnail);
        }
    });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const currentThumbnail = document.querySelector('.current-thumbnail');
            const targetIndex = parseInt(thumbnail.dataset.index, 10);
            const targetSlide = slides[targetIndex];

            if (!targetSlide) {
                return;
            }

            moveToSlide(track, currentSlide, targetSlide);
            if (currentThumbnail) {
                updateThumbnails(currentThumbnail, thumbnail);
            }
        });
    });
}

// Modal on slide click
const carouselImages = document.querySelectorAll('.carousel-img');
carouselImages.forEach(img => {
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '2000';
        modal.style.cursor = 'pointer';

        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.borderRadius = '10px';

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    });
});