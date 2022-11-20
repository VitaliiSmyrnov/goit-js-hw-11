const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31422890-5e40c603f0e6080de62657891';

export class ImagesAPI {
   static totalPages = 1;
   static currentPage = 1;
   static query = '';

   static findImages(searchQuery) {
      if (searchQuery !== undefined) {
         ImagesAPI.query = searchQuery;
         ImagesAPI.currentPage = 1;
      } else {
         ImagesAPI.currentPage += 1;
      }

      const params = new URLSearchParams({
         'q': ImagesAPI.query,
         'image_type': 'photo',
         'orientation': 'horizontal',
         'safesearch': 'true',
         'per_page': 40,
         'page': ImagesAPI.currentPage
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
}

