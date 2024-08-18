import { FC, memo } from 'react';
import { Typography, Button } from '@mui/material';

// Assets
import '@/assets/styles/features/fruits/fruitsListItem.scss';

// Interfaces
import { IFruit } from '@/app/interfaces/fruit.interface';

// Hooks
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

// Store
import { addFruit } from '@/app/store/slices/fruits.slice';

interface IFruitsListItemProps {
  fruit: IFruit;
}

const FruitsListItem: FC<IFruitsListItemProps> = ({ fruit }) => {
  const dispatch = useAppDispatch();

  const savedFruit = useAppSelector((store) =>
    store.fruits.savedFruits.find((f) => f.id === fruit.id),
  );

  const handleAddButtonClick = () => {
    if (savedFruit === undefined) dispatch(addFruit(fruit));
  };

  return (
    <div className='fruits-list-item'>
      <div className='fruits-list-item__text'>
        <Typography variant='subtitle1'>{fruit.name}</Typography>
        <Typography variant='body2'>Calories: {fruit.nutritions.calories}</Typography>
      </div>
      <Button
        onClick={handleAddButtonClick}
        variant={savedFruit === undefined ? 'text' : 'contained'}
        size='small'
      >
        Add
      </Button>
    </div>
  );
};

export default memo(FruitsListItem);
