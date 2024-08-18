import { PropsWithChildren } from 'react';

// Providers
import ReduxProvider from './Redux.provider';
import ReactQueryProvider from './ReactQuery.provider';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
