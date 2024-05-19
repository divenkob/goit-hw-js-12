import axios from 'axios'; 

export async function getImage(searchValue, page) {
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    const API_KEY = '43825908-e00f2a501e8ab3b01ba78a8cd';
    const paramsString = `?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  
    try {
      const { data } = await axios.get(paramsString);
      return data;
    } catch (error) {
      console.log(error);
    }
  }