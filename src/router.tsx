import React, { lazy, Suspense, useContext } from 'react';
import SuspenseLoader from './Component/SuspensLoader';
import PageContext from './Context/pageContext';

export const Loader = (Component: React.FC<any>) => {
  const WrappedComponent: React.FC<any> = (props) => (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
  return WrappedComponent;
};

interface PageProps {
  [key: number]: React.ReactNode;
}

const Dashboard = Loader(lazy(() => import('./Component/Dashboard')));
const Convert = Loader(lazy(() => import('./Page/convert')));
const Trading = Loader(lazy(() => import('./Page/trading')));
const pages: PageProps = {0: <Convert />, 1: <Trading />};

const Router = () => {
  const { page } = useContext(PageContext);
  return (
    <Dashboard>{pages[page]}</Dashboard>
  )
}

export default Router;