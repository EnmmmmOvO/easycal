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
const Router = () => {
  const { page }  = useContext(PageContext);
  const pages = {0: <Convert />};

  return pages[page];
}

export default Router;
