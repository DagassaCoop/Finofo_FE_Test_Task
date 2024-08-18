// Interfaces
import { EFruitAPISort, IFruit } from '@/app/interfaces/fruit.interface';
import { ISortsTitles } from '@/app/interfaces/fruitState.interfaces';

export function getSortsTitles(fruits: IFruit[]): ISortsTitles {
  const familyTitles = new Set(fruits.map((fruit) => fruit.family));
  const genusTitles = new Set(fruits.map((fruit) => fruit.genus));
  const orderTitles = new Set(fruits.map((fruit) => fruit.order));

  return {
    [EFruitAPISort.family]: Array.from(familyTitles),
    [EFruitAPISort.genus]: Array.from(genusTitles),
    [EFruitAPISort.order]: Array.from(orderTitles),
  };
}
