import { useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import '../index.css'; // Asegúrate de importar el archivo de estilos

function ProductsPage() {
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getProducts();
  }, [getProducts]); // Agregar getProducts como dependencia

  if (!products.length) {
    return (
      <>
        <Link
          className="fixed-bottom-right"
          to="/add-product"
        >
          Create a product
        </Link>
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl font-bold text-gray-500">No products</h1>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Link
        className="fixed-bottom-right"
        to="/add-product"
      >
        Create a product
      </Link>
    </div>
  );
}

export default ProductsPage;