$(document).ready(function(){


    var lineDrawing = anime({
        targets: '#lineDrawing .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 6000,
        delay: function(el, i) { return i * 1 },
        direction: 'alternate',
        loop: true
    });
    
});