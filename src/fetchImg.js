import axios from 'axios';

async function fetchImages(name, page, perPage) {
  const baseURL = 'https://pixabay.com/api/';
  const key = '32051975-6abf71968f2bd4c1ae7afccaf';

  try {
    const response = await axios.get(
      `${baseURL}?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.status);
  }
}

export { fetchImages };
