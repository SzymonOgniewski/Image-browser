import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');

const searchImg = async name => {
  return await fetch(
    `https://pixabay.com/api/?key=32051975-6abf71968f2bd4c1ae7afccaf&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    console.log(res.json());
    return res.json();
  });
};

form.addEventListener('submit', console.log(input.value));
