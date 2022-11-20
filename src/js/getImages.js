import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31422890-5e40c603f0e6080de62657891';

export class ImagesAPI {
   static totalPages = 1;
   static currentPage = 1;
   static query = '';

   static async findImages(searchQuery) {
      if (searchQuery !== undefined) {
         ImagesAPI.query = searchQuery;
         ImagesAPI.currentPage = 1;
      } else {
         ImagesAPI.currentPage += 1;
      }

      const options = {
         params: {
            'key': API_KEY,
            'q': ImagesAPI.query,
            'image_type': 'photo',
            'orientation': 'horizontal',
            'safesearch': 'true',
            'per_page': 40,
            'page': ImagesAPI.currentPage
         }
      }

      try {
         const response = await axios.get(`${BASE_URL}`, options);
         return response.data;
       } catch (error) {
         console.log(error);
       }
   }
}

