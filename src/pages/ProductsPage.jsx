import { useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-bold text-gray-500">No products</h1>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}

export default ProductsPage;
