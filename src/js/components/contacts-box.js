const closeBtn = document.querySelector('.close-btn');
const contactBox = document.querySelector('.contacts__address');

closeBtn.addEventListener('click', () =>{
    contactBox.style.visibility = 'hidden'
})
