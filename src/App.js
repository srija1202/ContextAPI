// App.js
import React from 'react';
import { ProductProvider } from './component/ProductContext';
import ProductList from './component/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <ProductProvider>
          <div className="App">
              <h1 className="text-center my-4">Product List</h1>
              <ProductList />
          </div>
      </ProductProvider>
  );
};

export default App;
