import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import galleryCard from './templates/galleryCard.hbs';
import { ImagesAPI } from './js/getImages.js';
import { smoothScroll } from './js/smoothScroll.js';


const searchFormRef = document.querySelector('#search-form');
const galleryContainerRef = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');

let lightbox;

function onSearchButtonClick(e) {
   e.preventDefault();
   const form = e.currentTarget;
  const searchQuery = form.elements.searchQuery.value.trim();
  
  ImagesAPI.findImages(searchQuery)
  .then(data => {
     if (data.hits.length === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }
     Notify.success(`Hooray! We found ${data.totalHits} images.`);
     
     galleryContainerRef.innerHTML = '';
     renderGalleryCard(data);
     lightbox = new SimpleLightbox('.gallery a');
     
     ImagesAPI.totalPages = data.totalHits / data.hits.length;
     if (ImagesAPI.totalPages > 1) btnLoad.classList.remove('visually-hidden');  
    })
    .catch(onSearchError);
}

function renderGalleryCard(value) {
   const markup = galleryCard(value.hits);
   galleryContainerRef.insertAdjacentHTML('beforeend', markup);
}

function onSearchError(error) {
   Notify.failure(error);
}

function onLoadMoreButtonClick() {
   ImagesAPI.findImages().then(data => {
      if (ImagesAPI.totalPages < ImagesAPI.currentPage) {
         Notify.info("We're sorry, but you've reached the end of search results.");
         btnLoad.classList.add('visually-hidden');
      }
      renderGalleryCard(data);
      lightbox.refresh();
      smoothScroll();
   }).catch(onSearchError);
}

searchFormRef.addEventListener('submit', onSearchButtonClick);
btnLoad.addEventListener('click', onLoadMoreButtonClick);
