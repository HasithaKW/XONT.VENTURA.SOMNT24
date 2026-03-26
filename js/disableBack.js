if (typeof window.event != 'undefined')
    document.onkeydown = function() {

        if (event.srcElement.tagName.toUpperCase() != 'TEXTAREA')
            return (event.keyCode != 8);
    }
else
    document.onkeypress = function(e) {
        if (e.target.nodeName.toUpperCase() != 'TEXTAREA')
            return (e.keyCode != 8);
    }