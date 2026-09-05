import axios from 'axios';
import type { Character, Novel } from '../models';
import { logger } from '../utils';

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
      const { data } = await axios.post<{ results: { title: string }[] }>(
        'https://api.vndb.org/kana/vn',
        query,
      );
      const titles: string[] = [];
      data.results.forEach((item) => titles.push(item.title));
      titles.push('Maggot baits');
      return titles;
    } catch (error) {
      logger.error(String(error));
      return undefined;
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
    try {
      const { data } = await axios.post<Novel>('https://api.vndb.org/kana/vn', query);
      return data.results[0];
    } catch (error) {
      logger.error(String(error));
      return undefined;
    }
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
    try {
      const { data } = await axios.post<Character>('https://api.vndb.org/kana/character', query);
      return data.results[0];
    } catch (error) {
      logger.error(String(error));
      return undefined;
    }
  },
};
