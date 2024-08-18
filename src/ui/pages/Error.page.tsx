import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

// Assets
import '@/assets/styles/pages/errorPage.scss';

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className='error-page'>
      <Button>
        <Link to='/'>To Main</Link>
      </Button>
      <div className='error-page__text'>
        <Typography variant='h1'>Oops!</Typography>
        <Typography variant='subtitle1'>Sorry, an unexpected error has occurred.</Typography>
        <Typography variant='body1'>
          <i>{error.statusText || error.message}</i>
        </Typography>
      </div>
    </div>
  );
};

export default ErrorPage;
