import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

import { fetchImages } from './fetchImg';
import simpleLightbox from 'simplelightbox';

const searchQuery = document.querySelector('input');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const clearBtn = document.querySelector('.clear-btn');

let perPage = 40;
let page = 0;
let name = searchQuery.value;

async function eHandler(e) {
  loadMoreBtn.style.display = 'none';
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  name = searchQuery.value;

  fetchImages(name, page, perPage)
    .then(name => {
      let totalPages = name.totalHits / perPage;
      if (name.hits.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${name.totalHits} images`);
        renderGallery(name);
        new SimpleLightbox('.gallery a');
        clearBtn.style.display = 'block';
        clearBtn.addEventListener('click', () => {
          gallery.innerHTML = '';
          clearBtn.style.display = 'none';
          loadMoreBtn.style.display = 'none';
        });

        if (page < totalPages) {
          loadMoreBtn.style.display = 'block';
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        gallery.innerHTML = '';
      }
    })
    .catch(error => console.log(error));
}

function renderGallery(name) {
  const markup = name.hits
    .map(hit => {
      return `<div class="photo-card">
        <a class="gallery-item" href="${hit.largeImageURL}">
          <img
            class="img-preview"
            src="${hit.webformatURL}"
            alt="${hit.tags}"
            loading="lazy"
        /></a>
        <div class="info">
          <div class="info-box">
            <p class="info-item">
              <b >Likes</b>
            </p>
            <p class="info-counter">${hit.likes.toLocaleString()}</p>
          </div>
          <div class="info-box">
            <p class="info-item">
              <b >Views</b>
            </p>
            <p class="info-counter">${hit.views.toLocaleString()}</p>
          </div>
          <div class="info-box">
            <p class="info-item">
              <b>Comments</b>
            </p>
            <p class="info-counter">${hit.comments.toLocaleString()}</p>
          </div>
          <div class="info-box">
            <p class="info-item">
              <b class="material-symbols-outlined">Downloads</b>
            </p>
            <p class="info-counter">${hit.downloads.toLocaleString()}</p>
          </div>
        </div>
      </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.style.display = 'none';
clearBtn.style.display = 'none';

loadMoreBtn.addEventListener(
  'click',
  () => {
    name = searchQuery.value;
    page += 1;
    fetchImages(name, page, perPage).then(name => {
      let totalPages = name.totalHits / perPage;
      renderGallery(name);
      new SimpleLightbox('.gallery a');
      if (page >= totalPages) {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info('All search results have been already loaded');
      }
    });
  },
  true
);

form.addEventListener('submit', eHandler);
