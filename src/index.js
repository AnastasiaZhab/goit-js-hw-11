import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
const url = 'https://pixabay.com/api/';
const API_KEY = '24939535-87b6ece9ab011f11d00db958e';
const parameters = 'image_type=photo&orientation=horizontal&safesearch=true'

const refs = {
    onInputEl: document.querySelector('input'),
    submitBtnEl: document.querySelector('button'),
    gallery: document.querySelector('.gallery'),
// 
}

const getImage = (value) => {
    return axios.get(`${url}?key=${API_KEY}&q=${value}&${parameters}`);
}

async function onSearch(e) {
    e.preventDefault();

    try {
        const value = refs.onInputEl.value;

        const objectImages = await getImage(value);
        const arrayImages = objectImages.data.hits;
        const galleryItems = arrayImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b>
                    <span>${likes}</span>
                    </p>
                    <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                    </p>
                    <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                    </p>
                    <p class="info-item">
                    <b>Downloads</b>
                    <span>${downloads}</span>
                    </p>
                </div>
                </div>
            `;
        }).join(' ');

        refs.gallery.insertAdjacentHTML('afterbegin', galleryItems);

        if (arrayImages.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
        
    } catch(error) {
        console.log(error);
}
}


refs.submitBtnEl.addEventListener('click', onSearch);





