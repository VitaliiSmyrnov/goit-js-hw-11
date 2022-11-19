import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import galleryCard from './templates/galleryCard.hbs';

const searchFormRef = document.querySelector('#search-form');
const galleryContainerRef = document.querySelector('.gallery');
const inputRef = document.querySelector('[name="searchQuery"]');

searchFormRef.addEventListener('submit', onSearch);

function onSearch(e) {
   e.preventDefault();

   const form = e.currentTarget;
   const searchQuery = form.elements.searchQuery.value;
   
   findImages(searchQuery).then(renderGalleryCard).catch(onFetchError);
}

function findImages(searchQuery) {
   const BASE_URL = 'https://pixabay.com/api/';
   const API_KEY = '31422890-5e40c603f0e6080de62657891';
   const params = new URLSearchParams({
      'q': searchQuery,
      'image_type': 'photo',
      'orientation': 'horizontal',
      'safesearch': 'true',
      'per_page': 40,
      'page': 1
   });
   
   const url = `${BASE_URL}?key=${API_KEY}&${params}`;

   return fetch(url).then(response =>{
      if (response.ok) {
         return response.json();
       } else {
          throw new Error(response.status);
       }
   });
}

function renderGalleryCard(value) {
   // console.log(value);
   if (value.hits.length === 0) {
      return Notify.info('Sorry, there are no images matching your search query. Please try again.');
   }
   
   Notify.success(`Hooray! We found ${value.totalHits} images.`)
   const markup = galleryCard(value.hits);
   galleryContainerRef.innerHTML = markup;
}

function onFetchError(error) {
   Notify.failure(error);
}

let lightbox = new SimpleLightbox('.gallery a');

