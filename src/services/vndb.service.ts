import axios from 'axios';
import { IChar, INovel } from '../models';

export const vndbService = {
  async vnsByRating() {
    const query = {
      filters: ['rating', '>', '80'],
      fields: 'title',
      sort: 'rating',
      reverse: true,
      results: 50,
      page: 1,
    };
    try {
      const { data } = await axios.post('https://api.vndb.org/kana/vn', query);
      const titles: string[] = [];
      data.results.forEach((item) => titles.push(item.title));
      titles.push('Maggot baits');
      return titles;
    } catch (error) {
      console.log(error);
    }
  },
  async getVn(searchQuery: string) {
    const query = {
      filters: ['search', '=', searchQuery],
      fields: 'title, rating, length_minutes, description, image.url',
      sort: 'searchrank',
      results: 1,
      page: 1,
    };
    const { data } = await axios.post<INovel>('https://api.vndb.org/kana/vn', query);
    return data.results[0];
  },
  async getChar(searchQuery: string) {
    const query = {
      filters: ['search', '=', searchQuery],
      fields:
        'name, description, image.url, height, weight, bust, waist, hips, cup, age, sex, id, vns.title',
      sort: 'searchrank',
      results: 1,
      page: 1,
    };
    const { data } = await axios.post<IChar>('https://api.vndb.org/kana/character', query);
    return data.results[0];
  },
};
