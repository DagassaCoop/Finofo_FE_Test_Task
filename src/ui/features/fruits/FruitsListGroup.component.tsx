import { FC, memo, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

// Assets
import '@/assets/styles/features/fruits/fruitsListGroup.scss';

// Interfaces
import { EFruitAPISort, IFruit } from '@/app/interfaces/fruit.interface';

// Hooks
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

// Store
import { addFruits } from '@/app/store/slices/fruits.slice';

// Components
import FruitsList from './FruitsList.components';

interface IFruitsListGroupProps {
  sortBy: EFruitAPISort;
  name: string;
}

const FruitsListGroup: FC<IFruitsListGroupProps> = ({ name, sortBy }) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  const groupFruits = queryClient.getQueryData<IFruit[]>(['fruits', name]);
  const savedGroupFruits = useAppSelector((store) => store.fruits.savedFruits).filter(
    (fruit) => fruit[EFruitAPISort[sortBy] as keyof typeof fruit] === name,
  );

  const handleAddAllButtonClick = (e: any) => {
    e.stopPropagation();
    if (groupFruits && groupFruits.length !== savedGroupFruits.length) {
      const newSavedFruits = groupFruits.filter((fruit) => {
        if (savedGroupFruits.find((f) => f.id === fruit.id) === undefined) return fruit;
      });
      if (newSavedFruits) dispatch(addFruits(newSavedFruits));
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange} className='fruits-list-group'>
      <AccordionSummary
        className={[
          'fruits-list-group__summary',
          expanded ? 'fruits-list-group__summary_expanded' : '',
        ].join(' ')}
      >
        <Typography variant='subtitle1'>{name}</Typography>
        <div className='fruits-list-group__summary-buttons'>
          <Button
            variant={groupFruits?.length !== savedGroupFruits.length ? 'text' : 'contained'}
            onClick={handleAddAllButtonClick}
          >
            Add all
          </Button>
          <ExpandMoreIcon />
        </div>
      </AccordionSummary>
      <AccordionDetails className='fruits-list-group__details'>
        <FruitsList sortBy={sortBy} name={name} />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(FruitsListGroup);
