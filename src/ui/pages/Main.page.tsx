import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { Tabs, Tab, Button, Typography } from '@mui/material';

// Assets
import '@/assets/styles/pages/mainPage.scss';

// Hooks
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

// Store
import { fetchFruits, removeAllFruits } from '@/app/store/slices/fruits.slice';

// Interfaces
import { EFruitAPISort } from '@/app/interfaces/fruit.interface';

// Components
import FruitsList from '../features/fruits/FruitsList.components';
import FruitsListGroup from '../features/fruits/FruitsListGroup.component';
import JarList from '../features/jar/JarList.component';
import JarSummary from '../features/jar/JarSummary.component';

const fruitSubtitlesContext = {
  null: 'All available fruits',
  [EFruitAPISort.family]: 'Fruits sorted by family',
  [EFruitAPISort.genus]: 'Fruits sorted by genus',
  [EFruitAPISort.order]: 'Fruits sorted by order',
};

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFruits());
  });

  const familyTitles = useAppSelector((store) => store.fruits.sortsTitles[EFruitAPISort.family]);
  const genusTitles = useAppSelector((store) => store.fruits.sortsTitles[EFruitAPISort.genus]);
  const orderTitles = useAppSelector((store) => store.fruits.sortsTitles[EFruitAPISort.order]);

  // Fruits Tab
  const [fruitListTabValue, setFruitListTabValue] = React.useState<EFruitAPISort | null>(null);

  const handleFruitListTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setFruitListTabValue(newValue);
  };

  // Fruits content
  const [sortedList, setSortedList] = useState<string[]>([]);

  useEffect(() => {
    function updateSortedList() {
      switch (fruitListTabValue) {
        case EFruitAPISort.family:
          setSortedList(familyTitles);
          break;
        case EFruitAPISort.genus:
          setSortedList(genusTitles);
          break;
        case EFruitAPISort.order:
          setSortedList(orderTitles);
          break;
      }
    }

    if (fruitListTabValue !== null) {
      updateSortedList();
    }
  }, [fruitListTabValue]);

  // Jar Tab
  const [jarListTabValue, setJarListTabValue] = React.useState(0);

  const handleJarListTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setJarListTabValue(newValue);
  };

  // Remove all fruits button
  const savedFruits = useAppSelector((store) => store.fruits.savedFruits);

  const handleRemoveAllButton = () => {
    dispatch(removeAllFruits());
  };

  return (
    <div className='main-page'>
      <section className='main-page__list'>
        <Container>
          <Tabs value={fruitListTabValue} onChange={handleFruitListTabChange} centered>
            <Tab label='All' value={null} />
            <Tab label='Family' value={EFruitAPISort.family} />
            <Tab label='Genus' value={EFruitAPISort.genus} />
            <Tab label='Order' value={EFruitAPISort.order} />
          </Tabs>
          <div className='main-page__list-content'>
            <Typography className='main-page__list-content-title' variant='subtitle2'>
              {fruitSubtitlesContext[fruitListTabValue as keyof typeof fruitSubtitlesContext]}
            </Typography>
            {fruitListTabValue === null && <FruitsList />}
            {fruitListTabValue !== null &&
              sortedList.map((item) => {
                return <FruitsListGroup key={item} sortBy={fruitListTabValue} name={item} />;
              })}
          </div>
        </Container>
      </section>
      <section className='main-page__jar'>
        <Container>
          <Tabs value={jarListTabValue} onChange={handleJarListTabChange} centered>
            <Tab label='Saved fruits' />
            <Tab label='Summary' />
          </Tabs>
          <div className='main-page__jar-content'>
            {jarListTabValue === 0 && (
              <>
                <JarList />
                {savedFruits.length >= 3 && (
                  <Button
                    className='main-page__jar-remove-all-btn'
                    color='error'
                    size='medium'
                    variant='contained'
                    onClick={handleRemoveAllButton}
                  >
                    Remove all
                  </Button>
                )}
              </>
            )}
            {jarListTabValue === 1 && <JarSummary />}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default MainPage;
