import { EFruitAPISort } from '@/app/interfaces/fruit.interface';
import axios, { AxiosError } from 'axios';

const fruitAPI = axios.create({
  baseURL: 'api/',
  timeout: 1000,
});

export const getAllFruits = async () => {
  try {
    const { data } = await fruitAPI.get(`fruit/all`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === 404) return null;
    throw error;
  }
};

export const getSortedFruits = async (sortBy: EFruitAPISort, name: string) => {
  try {
    const { data } = await fruitAPI.get(`fruit/${EFruitAPISort[sortBy]}/${name}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === 404) return null;
    throw error;
  }
};
