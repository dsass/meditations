window.onkeyup = function(e) {
    var event = e.which || e.keyCode || 0; // .which with fallback

    if (event == 27) { // ESC Key
        window.location.href = '/meditations'; // Navigate to URL
    }
}
