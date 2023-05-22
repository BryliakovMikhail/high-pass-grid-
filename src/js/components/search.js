const btnSearchIcon = document.querySelector(".btn-search");
const searchInputBox = document.querySelector(".header__search-input");
const searchInput = document.querySelector('.search-input');
const btnCloseSearch = document.querySelector('.search-close');

btnSearchIcon.addEventListener("click", () => {
  searchInputBox.classList.add("active");
  searchInputBox.style.transition = "visibility 0.2s ease-in-out, transform 0.2s ease-in-out";
  btnSearchIcon.style.visibility = 'hidden';
  btnSearchIcon.style.transition = 'visibility 0.2s ease-in-out'
});

btnCloseSearch.addEventListener('click', () => {
    searchInputBox.classList.remove('active')
    searchInputBox.style.transition = "visibility 0.2s ease-in-out, transform 0.2s ease-in-out";
    searchInput.value = '';
    btnSearchIcon.style.visibility = 'visible';
    btnSearchIcon.style.transition = 'visibility 0.2s ease-in-out'
})
