import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import axios from 'axios';

const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
async function getImages(name) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=32051975-6abf71968f2bd4c1ae7afccaf&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

const createImage = () => {
  const imageBox = document.createElement('div');
  gallery.append(imageBox);
  const img = document.createElement('img');
  img.src = data.hits.webformatURL;
  img.alt = data.hits.tags;
  imageBox.append(img);
};

form.addEventListener('submit', () => {
  event.preventDefault();
  getImages(input.value).then(data => {
    createImage();
  });
});
