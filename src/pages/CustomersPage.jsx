import { useEffect, useState } from 'react';
import { useCustomer } from '../context/CustomerContext';
import { Link } from 'react-router-dom';

function CustomersPage() {
  const { customers, getCustomers } = useCustomer();
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    getCustomers();
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Clientes</h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-zinc-800 text-gray-200">
            <tr>
              {[
                'document',
                'name',
                'address',
                'phone',
                'createdAt',
                'updatedAt',
                'edit',
              ].map((column) => (
                <th
                  key={column}
                  className="py-3 px-4 text-left text-sm font-medium cursor-pointer hover:bg-gray-700"
                  onClick={() => handleSort(column)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortColumn === column && (
                    <span className="ml-1 text-gray-500">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {sortedCustomers.map((customer) => (
              <tr key={customer._id} className="hover:bg-zinc-700">
                <td className="py-3 px-4 text-sm text-gray-100">
                  {customer.document}
                </td>
                <td className="py-3 px-4 text-sm text-gray-100">
                  {customer.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-100">
                  {customer.address}
                </td>
                <td className="py-3 px-4 text-sm text-gray-100">
                  {customer.phone}
                </td>
                <td className="py-3 px-4 text-sm text-gray-100">
                  {formatDate(customer.createdAt)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-100">
                  {formatDate(customer.updatedAt)}
                </td>
                <td className="py-3 px-4 text-sm text-gray-100">
                  <Link className="underline" to={`/customers/${customer._id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomersPage;
