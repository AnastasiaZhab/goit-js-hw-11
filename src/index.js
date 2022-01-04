import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const url = 'https://pixabay.com/api/';
const API_KEY = '24939535-87b6ece9ab011f11d00db958e';
const parameters = 'image_type=photo&orientation=horizontal&safesearch=true';
const per_page = 40;
let value = '';
let page;


const refs = {
    inputValue: document.querySelector('input'),
    searchForm: document.querySelector('.search-form'),
    submitBtnEl: document.querySelector('button'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),

}

refs.loadMoreBtn.classList.add('is-hidden');

const getImage = (value) => {
    return axios.get(`${url}?key=${API_KEY}&q=${value}&${parameters}&page=${page}&per_page=${per_page}`);
}

function onSearch(e) {
    e.preventDefault();
    refs.gallery.innerHTML = '';
    page = 1;

    value = e.currentTarget.elements.searchQuery.value;
    refs.loadMoreBtn.classList.add('is-hidden');
    createImagesBox();
 
        
}

async function createImagesBox() {
    
    try {
        let objectImages = await getImage(value);
        const totalHits = objectImages.data.totalHits;
        let arrayImages = objectImages.data.hits;
        let galleryItems = arrayImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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

        refs.gallery.insertAdjacentHTML('beforeend', galleryItems);

        if (totalHits > per_page) {
            refs.loadMoreBtn.classList.remove('is-hidden');
        }
          
        if (arrayImages.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

        if (arrayImages.length < per_page && arrayImages.length > 0) {
            refs.loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`)
        }

        if (page === 1 && totalHits > 0) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
        

    }
    catch(error) {
         console.log(error);
        }

}


const lightbox = e => {
    e.preventDefault();
    
    new SimpleLightbox('.gallery a', {
        overlay: true,
        captions: true,
        showCounter: true,
        close: true,
    })
}

function onLoadMore() {
    page += 1;
    createImagesBox();
    lightbox.refresh();

}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', lightbox);




