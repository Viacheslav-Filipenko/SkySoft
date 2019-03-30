const container = document.querySelector('.container');

const allRectangles = [];

document.querySelectorAll('.rectangle').forEach(rectangle => {

    allRectangles.push(rectangle);

});

container.onmousedown = (event) => {

    const target = event.target;

    if (!target.classList.contains('rectangle')) {
        return;
    }

    let coordinates = getCoordinates(target);

    const shift = {
        X: event.pageX - coordinates.left,
        Y: event.pageY - coordinates.top
    }

    moveAt(event);

    target.style.zIndex = 1000.

    function moveAt(event) {

        const limits = getCoordinates(container);

        const position = {
            left: event.pageX - shift.X,
            right: event.pageX - shift.X + target.offsetWidth,
            top: event.pageY - shift.Y,
            bottom: event.pageY - shift.Y + target.offsetHeight
        };

        target.style.left = position.left + 'px';
        target.style.top = position.top + 'px';

        if (position.right > limits.right) {
            target.style.left = container.offsetWidth - target.offsetWidth + 'px';
        }
        if (position.left < limits.left) {
            target.style.left = 0 + 'px';
        }

        if (position.top < limits.top) {
            target.style.top = 0 + 'px';
        }

        if (position.bottom > limits.bottom) {
            target.style.top = container.offsetHeight - target.offsetHeight + 'px';
        }


        allRectangles.forEach(rectangle => {

            if (rectangle != target) {

                const block = getCoordinates(rectangle);

                if (position.right >= block.left && block.right <= limits.right && (position.top <= block.bottom && position.bottom >= block.top) && position.right - block.left < 8) {

                    target.style.left = position.right + 'px';
                    rectangle.style.left = position.right + 'px';
                }

                if (position.left <= block.right && block.left >= limits.left && (position.top <= block.bottom && position.bottom >= block.top) && position.left - block.right >= -30) {
                    target.style.left = position.left + 'px';
                    rectangle.style.left = position.left - rectangle.offsetWidth + 'px';
                }

                if (position.top <= block.bottom && block.top >= limits.top && (position.left <= block.right && position.right >= block.left) && position.top - block.bottom >= -30) {
                    target.style.top = position.top + 'px';
                    rectangle.style.top = position.top - rectangle.offsetHeight + 'px';
                }

                if (position.bottom >= block.top && block.bottom <= limits.bottom && (position.left <= block.right && position.right >= block.left) && position.bottom - block.top < 8) {
                    target.style.top = position.bottom + 'px';
                    rectangle.style.top = position.bottom + 'px';
                }

                if (block.right > limits.right) {
                    rectangle.style.left = container.offsetWidth - rectangle.offsetWidth + 'px';

                }
                if (block.left < limits.left) {
                    rectangle.style.left = 0 + 'px';
                }

                if (block.top < limits.top) {
                    rectangle.style.top = 0 + 'px';
                }

                if (block.bottom > limits.bottom) {
                    rectangle.style.top = container.offsetHeight - rectangle.offsetHeight + 'px';
                }
            }
        });

    }

    document.onmousemove = function (event) {
        moveAt(event);
    }

    target.ondragstart = function () {
        return false;
    }

    target.onmouseup = function () {

        document.onmousemove = null;
        target.onmouseup = null;
    }

    function getCoordinates(element) {

        const box = element.getBoundingClientRect();
        return {
            top: box.top + pageXOffset,
            left: box.left + pageYOffset,
            right: box.right + pageXOffset,
            bottom: box.bottom + pageYOffset,
        };

    }
}