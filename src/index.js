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
   
   fetchImage(searchQuery).then(renderGalleryCard).catch(onFetchError);
}

function fetchImage(searchQuery) {
   const url = `https://pixabay.com/api/?key=31422890-5e40c603f0e6080de62657891&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

   return fetch(url).then(res => res.json());
}

function renderGalleryCard(value) {
   console.log(value.hits);
   const markup = galleryCard(value.hits);
   galleryContainerRef.innerHTML = markup;
}

function onFetchError() {
   Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

let lightbox = new SimpleLightbox('.gallery a');

