import './sass/main.scss';
import Notiflix from 'notiflix';
// const axios = require('axios');
import axios from 'axios';
const url = 'https://pixabay.com/api/';
const API_KEY = '24939535-87b6ece9ab011f11d00db958e';
const parameters = 'image_type=photo&orientation=horizontal&safesearch=true'

const refs = {
    onInputEl: document.querySelector('input'),
    submitBtnEl: document.querySelector('button'),
    // gallery: document.querySelector('.gallery'),
// 
}

// console.log('bnmbnm');

const getImage = (value) => {
    return axios.get(`${url}?key=${API_KEY}&q=${value}&${parameters}`);
}

async function onSearch(e) {
    e.preventDefault();

    try {
        const value = refs.onInputEl.value;

        const objectImages = await getImage(value);
        console.log('objectImages', objectImages);
        const arrayImages = objectImages.data.hits;
        console.log('arrayImages', arrayImages);
        const galleryItems = arrayImages.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            console.log('likes', likes);
            console.log(comments);
            return `<div class="photo-card">
            <a href="${largeImageURL}>
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b>
                    <b>${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views</b>
                    <b>${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments</b>
                    <b>${comments}}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads</b>
                    <b>${downloads}</b>
                    </p>
                </div>
                </div>
            `;
        }).join(' ');

        refs.gallery.insertAdjacentHTML('beforeend', galleryItems);
        
    } catch(error) {
        console.log(error);
}
}



// getImage();
refs.submitBtnEl.addEventListener('click', onSearch);









// const createUser = options => {
//     return axios.post('https://technical-b88ba-default-rtdb.europe-west1.firebasedatabase.app/users.json',
//         options
//     );
// }

// const getUserInfo = id => {
//     return axios.get(`https://technical-b88ba-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`
//     );
// }


// const render = async () => {
    //     console.log('start')
//     const { data } = await createUser({
    //         name: 'Olya',
    //         language: 'en',
//         skill: 'css'
//     });
//     console.log('после создания', data);
//     const info = await getUserInfo(data.name);
//     console.log('info', info)
//     console.log('finish')

// };
// render();