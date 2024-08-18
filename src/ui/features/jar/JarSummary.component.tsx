import { FC, memo } from 'react';
import { Typography } from '@mui/material';

// Assets
import '@/assets/styles/features/jar/jarSummary.scss';

// Hooks
import { useAppSelector } from '@/app/store/hooks';

const JarSummary: FC = () => {
  const savedFruits = useAppSelector((store) => store.fruits.savedFruits);

  return (
    <div className='jar-summary'>
      <div className='jar-summary__item'>
        <Typography className='jar-summary__item-title' variant='h4'>
          {savedFruits.length}
        </Typography>
        <Typography className='jar-summary__item-description' variant='body2'>
          Total amount of saved fruits.
        </Typography>
      </div>
      <div className='jar-summary__item'>
        <Typography className='jar-summary__item-title' variant='h4'>
          {savedFruits.reduce((a, b) => a + b.nutritions.calories, 0)}
        </Typography>
        <Typography className='jar-summary__item-description' variant='body2'>
          Total amount of calories in saved fruits.
        </Typography>
      </div>
    </div>
  );
};

export default memo(JarSummary);
