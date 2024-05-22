import React, { Suspense, useContext } from 'react';
import SuspenseLoader from '../../components/SuspensLoader';
import PageContext from '../../contexts/pageContext';

export const Loader = (Component: React.FC<any>) => {
  const WrappedComponent: React.FC<any> = (props) => (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
  return WrappedComponent;
};

const Convert = Loader(React.lazy(() => import('../../pages/convert')));
const Trading = Loader(React.lazy(() => import('../../pages/trading')));
const Trading2 = Loader(React.lazy(() => import('../../pages/trading2')));
const Dashboard = Loader(React.lazy(() => import('../../components/Dashboard')));

const Router = () => {
  const { page }  = useContext(PageContext);
  const pages = {0: <Convert />, 1: <Trading />, 2: <Trading2 />};

  return <Dashboard>{pages[page]}</Dashboard>;
}

export default Router;
