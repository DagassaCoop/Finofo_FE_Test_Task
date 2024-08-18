import { FC, memo } from 'react';

// Hooks
import { useAppSelector } from '@/app/store/hooks';

// Components
import JarListItem from './JarListItem.component';

const JarList: FC = () => {
  const savedFruits = useAppSelector((store) => store.fruits.savedFruits);

  return (
    <div className='jar-list'>
      {savedFruits.map((fruit) => {
        return <JarListItem key={fruit.id} fruit={fruit} />;
      })}
    </div>
  );
};

export default memo(JarList);
