import { useForm } from 'react-hook-form';
import { useProduct } from '../context/ProductContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ProductFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createProduct, getProduct, updateProduct } = useProduct();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadProduct();
  }, [getProduct, params.id, setValue]);

  async function loadProduct() {
    if (params.id) {
      const product = await getProduct(params.id);
      setValue('name', product.name);
      setValue('price', product.price);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateProduct(params.id, data);
      await loadProduct(); // Recargar el producto después de la actualización
    } else {
      await createProduct(data);
    }
    navigate('/products');
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register('name')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Product name"
          />
          <input
            type="number"
            {...register('price')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Product price"
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-2 rounded-md"
            type="submit"
          >
            Save product
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;
