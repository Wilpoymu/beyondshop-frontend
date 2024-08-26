import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCustomer } from '../context/CustomerContext';

function CreateCustomersPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createCustomer, getCustomer, updateCustomer } = useCustomer();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadCustomer();
  }, [getCustomer, params.id, setValue]);

  async function loadCustomer() {
    if (params.id) {
      const customer = await getCustomer(params.id);
      setValue('document', customer.document);
      setValue('name', customer.name);
      setValue('address', customer.address);
      setValue('phone', customer.phone);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateCustomer(params.id, data);
      await loadCustomer(); // Recargar el customero después de la actualización
    } else {
      await createCustomer(data);
    }
    navigate('/customers');
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            type="number"
            {...register('document')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Customer document"
          />
          <input
            type="text"
            {...register('name')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Customer name"
          />
          <input
            type="text"
            {...register('address')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Customer address"
          />{' '}
          <input
            type="text"
            {...register('phone')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Customer phone"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-2 rounded-md"
            type="submit"
          >
            Save customer
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCustomersPage;
