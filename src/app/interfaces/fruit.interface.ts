import { INutrition } from './nutrition.interface';

export interface IFruit {
  genus: string;
  name: string;
  id: number;
  family: string;
  order: string;
  nutritions: INutrition;
}

export enum EFruitAPISort {
  family,
  genus,
  order,
}
