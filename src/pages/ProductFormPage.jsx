import { useForm } from 'react-hook-form';
import { useProduct } from '../context/ProductContext';

function ProductFormPage() {
  const { register, handleSubmit } = useForm();
  const { createProduct } = useProduct();

  const onSubmit = handleSubmit((data) => {
    createProduct(data);
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

          <button type="submit">Save product</button>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;
