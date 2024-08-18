import { useQuery } from '@tanstack/react-query';

// Interfaces
import { IFruit } from '@/app/interfaces/fruit.interface';

// API
import { getAllFruits } from '@/api/fruit.api';

const useFruits = () => {
  return useQuery<IFruit[], Error>({
    queryKey: ['fruits'],
    queryFn: () => getAllFruits(),
  });
};

export default useFruits;
