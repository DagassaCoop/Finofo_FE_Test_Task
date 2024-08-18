import React from 'react';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div className='root-layout'>
      <Outlet />
    </div>
  );
};

export default Root;
