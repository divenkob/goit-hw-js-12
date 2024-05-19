import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox"; 
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImage } from "./js/pixabay-api";
import { getMarkup } from "./js/render-functions";

const links = {
  formEL: document.querySelector('#form'),
  inputEL: document.querySelector('#image-input'),
  galleryEL: document.querySelector('#gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loaderEl: document.querySelector('#loader-js'),
};

let gallery = new SimpleLightbox('#gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let searchValue = '';
let page = 1;

function submitForm(event) {
  event.preventDefault();
  links.loadMoreBtn.classList.remove('is-visible');
  page = 1;
  links.galleryEL.innerHTML = '<span class="loader"></span>';
  searchValue = links.inputEL.value.trim();
  
  if (searchValue === '') {
    links.galleryEL.innerHTML = '';
    return iziToast.show({
      title: '<div class="error-remark"><img src="./img/error.svg" alt="error" class="error-svg"><span class="error-text">Introduction field please enter the value to search</span></div>',
      titleSize: '20px',
      message: '',
      backgroundColor: 'red',
      position: 'topRight',
    });
  }

  getImage(searchValue, page).then(data => {
    links.galleryEL.innerHTML = '';
    
    if (data.totalHits === 0) {
      return iziToast.show({
        title: '<div class="error-remark"><img src="./img/error.svg" alt="error" class="error-svg"><span class="error-text">Sorry, there are no images matching your search query. Please try again!</span></div>',
        titleSize: '20px',
        message: '',
        backgroundColor: 'red',
        position: 'topRight',
      });
    }

    getMarkup(data.hits, links.galleryEL);
    gallery.refresh();

    if (data.totalHits > 15) {
      links.loadMoreBtn.classList.add('is-visible');
    }
  })
  .catch(error => {
    links.galleryEL.innerHTML = '';
    iziToast.show({
      title: '<div class="error-remark"><img src="./img/error.svg" alt="error" class="error-svg"><span class="error-text">An error occurred while fetching the images. Please try again later.</span></div>',
      titleSize: '20px',
      message: '',
      backgroundColor: 'red',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  });

  links.formEL.reset();
}

function loadMore(event) {
  links.loaderEl.innerHTML = '<span class="loader"></span>';
  page += 1;

  getImage(searchValue, page).then(data => {
    links.loaderEl.innerHTML = '';
    getMarkup(data.hits, links.galleryEL);
    gallery.refresh();

    if (links.galleryEL) {
      const galleryHeight = links.galleryEL.getBoundingClientRect().height;
      window.scrollBy({
        top: galleryHeight * 2,
        behavior: 'smooth',
      });
    }

    if (Math.ceil(data.totalHits / 15) === page) {
      links.loadMoreBtn.classList.remove('is-visible');
      iziToast.show({
        title: '<div class="error-remark"><img src="./img/error.svg" alt="error" class="error-svg"><span class="error-text">We are sorry, but you have reached the end of search results.</span></div>',
        titleSize: '20px',
        message: '',
        backgroundColor: 'red',
        position: 'topRight',
      });
    }
  })
  .catch(error => {
    links.loaderEl.innerHTML = '';
    iziToast.show({
      title: '<div class="error-remark"><img src="./img/error.svg" alt="error" class="error-svg"><span class="error-text">An error occurred while loading more images. Please try again later.</span></div>',
      titleSize: '20px',
      message: '',
      backgroundColor: 'red',
      position: 'topRight',
    });
    console.error('Error loading more images:', error);
  });
}

links.formEL.addEventListener('submit', submitForm);
links.loadMoreBtn.addEventListener('click', loadMore);