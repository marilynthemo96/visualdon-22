const rectangles = document.querySelectorAll('.rectangle')

rectangles.forEach(rectangle => {
    rectangle.addEventListener('click', evt => {
        evt = evt.target;
        console.log(evt);
        rectangle.classList.toggle('highlight')
    })
})