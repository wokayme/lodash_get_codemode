import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function ProductItem({ price, title, description, quantity}) {
  return (
    <div className="productItem">
      <div className="productDescription">
        <b>{title}</b><br />
        <p>{description}</p>
        <p className='productQuantity'>quantity {quantity}</p>
      </div>
      <div className="productItem">{price} {quantity}</div>
    </div>
  );
}

ProductItem.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number
}

export default ProductItem;
