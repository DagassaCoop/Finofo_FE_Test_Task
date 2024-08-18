import { FC, memo } from 'react';
import { CircularProgress } from '@mui/material';

// Assets
import '@/assets/styles/features/fruits/fruitsList.scss';

// Hooks
import useFruits from '@/hooks/useFruits.hook';
import useSortedFruits from '@/hooks/useSortedFruits.hook';

// Interfaces
import { EFruitAPISort } from '@/app/interfaces/fruit.interface';

// Components
import FruitsListItem from './FruitsListItem.component';

interface IFruitsListProps {
  sortBy?: EFruitAPISort;
  name?: string;
}

const FruitsList: FC<IFruitsListProps> = ({ sortBy, name }) => {
  const { data: fruits, isLoading } =
    sortBy !== undefined && name ? useSortedFruits(sortBy, name) : useFruits();

  if (isLoading)
    return (
      <div className='fruits-list_empty'>
        <CircularProgress />
      </div>
    );

  return (
    <div className='fruits-list'>
      {fruits?.map((fruit) => {
        return <FruitsListItem key={fruit.id} fruit={fruit} />;
      })}
    </div>
  );
};

export default memo(FruitsList);
