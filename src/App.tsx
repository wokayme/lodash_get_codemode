import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductItem from './ProductItem';

const productList = [
  {
    price: 25, title: 'IPhone', description: "apple cellphone", quantity: 1
  },
  {
    price: 100, title: 'Ipad', description: "apple tablet", quantity: 1
  },
  {
    price: 5, title: 'Iphone charger', description: "charger compatible with iphone 6s", quantity: 1
  }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {productList.map(({ price, title, description, quantity})=><ProductItem price={price} title={title} quantity={quantity} description={description} />)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
