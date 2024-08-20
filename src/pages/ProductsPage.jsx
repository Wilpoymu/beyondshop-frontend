import { useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}

export default ProductsPage;
