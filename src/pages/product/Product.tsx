import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const history = useHistory();
  const local = useLocation();
  const match = useRouteMatch();

  console.log(history);
  console.log(local);
  console.log(match);

  return <div>ProductPage</div>;
};

export default ProductPage;
