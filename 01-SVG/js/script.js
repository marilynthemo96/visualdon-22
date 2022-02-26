const rectangles = document.querySelectorAll('.rectangle')

rectangles.forEach(rectangle => {
    rectangle.addEventListener('click', evt => {
        evt = evt.target;
        console.log(evt);
        rectangle.classList.toggle('highlight')
    })
})

const donuts = document.querySelectorAll('.donut')

donuts.forEach(donut => {
    donut.addEventListener('mouseover', evt => {
        evt = evt.target;
        console.log(evt);
        donut.classList.toggle('change')
    })
})