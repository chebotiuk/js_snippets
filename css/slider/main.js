var gallery = document.querySelector('.gallery');
var track = gallery.querySelector('.gallery__track');
var slides = track.querySelectorAll('.gallery__slide');

var prevButton = gallery.querySelector('.gallery__prev');
var nextButton = gallery.querySelector('.gallery__next');


var currentOffset = 0;


slides = Array.prototype.slice.call(slides);

var slideLength = slides.length;

function init() {

    gallery.classList.add('js-gallery');
    track.style.transition = 'transform 0.5s ease';
    var galleryWidth = gallery.clientWidth;

    track.style.width = slideLength * galleryWidth + 'px';

    slides.forEach(function (slide) {
       slide.style.width = galleryWidth + 'px';
    });
}


prevButton.addEventListener('click', function() {
    if (currentOffset === 0) {
        currentOffset = - (slideLength - 1) * gallery.clientWidth;
    } else {
        currentOffset += gallery.clientWidth;
    }

    track.style.transform = 'translate3d(' + currentOffset+ 'px, 0, 0)';
});

nextButton.addEventListener('click', function() {
    if (Math.abs(currentOffset) + gallery.clientWidth === slideLength*gallery.clientWidth) {
        currentOffset = 0;
    } else {
        currentOffset -= gallery.clientWidth;    
    }
    
    track.style.transform = 'translate3d(' + currentOffset + 'px, 0, 0)';
});


init();
