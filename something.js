function fireEvent() {
    var eventType = null,
        i, j, k, l, event,
        einstellungen = {
            'pointerX': 0,
            'pointerY': 0,
            'button': 0,
            'ctrlKey': false,
            'altKey': false,
            'shiftKey': false,
            'metaKey': false,
            'bubbles': true,
            'cancelable': true
        },
        moeglicheEvents = [
            ['HTMLEvents', ['load', 'unload', 'abort', 'error', 'select', 'change', 'submit', 'reset', 'focus', 'blur', 'resize', 'scroll']],
            ['MouseEvents', ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'mouseout']]
        ];

    for (i = 0, j = moeglicheEvents.length; i < j; ++i) {
        for (k = 0, l = moeglicheEvents[i][1].length; k < l; ++k) {
            if (arguments[1] === moeglicheEvents[i][1][k]) {
                eventType = moeglicheEvents[i][0];
                i = j;
                k = l;
            }
        }
    }

    if (arguments.length > 2) {
        if ((typeof arguments[2]) === 'object') {
            change(einstellungen, arguments[2]);
        }
    }

    if (eventType === null) {
        throw new SyntaxError('Event type "' + arguments[1] + '" is not implemented!');
    }

    if (document.createEvent) {
        event = document.createEvent(eventType);

        if (eventType === 'HTMLEvents') {
            event.initEvent(arguments[1], einstellungen.bubbles, einstellungen.cancalable);
        } else {
            event.initMouseEvent(arguments[1], einstellungen.bubbles, einstellungen.cancelable, document.defaultView,
                einstellungen.button, einstellungen.pointerX, einstellungen.pointerY, einstellungen.pointerX, einstellungen.pointerY,
                einstellungen.ctrlKey, einstellungen.altKey, einstellungen.shiftKey, einstellungen.metaKey, einstellungen.button, arguments[0]);
        }

        arguments[0].dispatchEvent(event);
    } else {
        einstellungen.clientX = einstellungen.pointerX;
        einstellungen.clientY = einstellungen.pointerY;

        event = document.createEventObject();

        event = extend(event, einstellungen);

        arguments[0].fireEvent('on' + arguments[1], event);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('btn');
    checkPageButton.addEventListener('click', function () {
        fireEvent(document.querySelector('#Bar_panel1_b0 > a'), 'click');
    }, false);
}, false);