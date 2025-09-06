import React from 'react';
import { useProducts } from '../hooks/useEcommerceApi';

const APITest = () => {
  const { data: products, isLoading, error } = useProducts();
  
  console.log('APITest - Full response:', products);
  console.log('APITest - Is loading:', isLoading);
  console.log('APITest - Error:', error);
  
  const productList = products?.products || [];
  console.log('APITest - Product list:', productList);
  console.log('APITest - Product count:', productList.length);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>API Test - Products Data</h2>
      <p>Total products: {productList.length}</p>
      <div>
        <h3>Raw Response:</h3>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </div>
      <div>
        <h3>Product List:</h3>
        {productList.map((product, index) => (
          <div key={product._id || index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <p>Status: {product.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APITest;
