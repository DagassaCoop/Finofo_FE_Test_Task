// Interfaces
import { EFruitAPISort, IFruit } from './fruit.interface';

export interface ISortsTitles {
  [EFruitAPISort.family]: string[];
  [EFruitAPISort.genus]: string[];
  [EFruitAPISort.order]: string[];
}

export interface IFruitsState {
  savedFruits: IFruit[];
  sortsTitles: ISortsTitles;
}
