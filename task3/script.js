document.querySelector(".container").addEventListener('click', (event) => {
    const pressed = document.querySelector('.highlighted');
    
    if (pressed) {
        pressed.classList.remove('highlighted')
    }

    event.target.classList.add('highlighted');
});