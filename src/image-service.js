export default class ImagesApiService {
    constructor() {

    }

    axiosImages() {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '24939535-87b6ece9ab011f11d00db958e';
    const parameters = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

    const getImage = axios.get(`${url}?key=${API_KEY}&q=${value}&${parameters}`);

    }
}