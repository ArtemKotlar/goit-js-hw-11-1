import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32614135-f94da82f42f168ae4ebe671a6';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.loadedHits = 0;
    this.per_page = 40;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    const url = `${BASE_URL}?${searchParams}`;

    try {
      const { data } = await axios.get(url);
      //this.incrementPage();
      return data;
    } catch (error) {
      console.warn(error);
    }
  }

  incrementLoadedHits(hits) {
    this.loadedHits += hits.length;
  }

  resetLoadedHits() {
    this.loadedHits = 0;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
