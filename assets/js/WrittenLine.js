$(document).ready(function(){


    var lineDrawing = anime({
        targets: '#lineDrawing .lines path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 3500,
        delay: function(el, i) { return i * 400 },
        direction: 'alternate',
        loop: false
    });
    
});