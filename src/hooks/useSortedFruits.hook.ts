import { useQuery } from '@tanstack/react-query';

// Interfaces
import { EFruitAPISort, IFruit } from '@/app/interfaces/fruit.interface';

// API
import { getSortedFruits } from '@/api/fruit.api';

const useSortedFruits = (sortBy: EFruitAPISort, name: string) => {
  return useQuery<IFruit[], Error>({
    queryKey: ['fruits', name],
    queryFn: () => getSortedFruits(sortBy, name),
  });
};

export default useSortedFruits;
