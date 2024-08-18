import { FC, memo } from 'react';
import { Typography, Button } from '@mui/material';

// Assets
import '@/assets/styles/features/jar/jarListItem.scss';

// Interfaces
import { IFruit } from '@/app/interfaces/fruit.interface';

// Hooks
import { useAppDispatch } from '@/app/store/hooks';

// Store
import { removeFruitById } from '@/app/store/slices/fruits.slice';

interface IJarListItem {
  fruit: IFruit;
}

const JarListItem: FC<IJarListItem> = ({ fruit }) => {
  const dispatch = useAppDispatch();

  const handleRemoveButtonClick = () => {
    dispatch(removeFruitById(fruit.id));
  };

  return (
    <div className='jar-list-item'>
      <div className='jar-list-item__text'>
        <Typography variant='subtitle1'>{fruit.name}</Typography>
        <Typography variant='body2'>Calories: {fruit.nutritions.calories}</Typography>
      </div>
      <Button onClick={handleRemoveButtonClick} variant='contained' size='small' color='error'>
        Remove
      </Button>
    </div>
  );
};

export default memo(JarListItem);
