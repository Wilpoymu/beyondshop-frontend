import { useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}

export default ProductsPage;
