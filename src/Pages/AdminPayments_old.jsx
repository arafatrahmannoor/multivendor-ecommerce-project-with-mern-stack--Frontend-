import React from 'react';

import { useAdminPayments, useCreatePayout } from '../hooks/useEcommerceApi';
import useTheme from '../hooks/useTheme';

const AdminPayments = () => {
  const { theme } = useTheme();
  const { data, isLoading, error } = useAdminPayments();
  const createPayout = useCreatePayout();

  const payments = data?.data || [];

  const handleCreatePayout = async (vendorId, amount) => {
    const confirmed = window.confirm(`Create payout of $${amount} for this vendor?`);
    if (confirmed) {
      createPayout.mutate({ vendorId, amount });
    }
  };

  if (isLoading) return <div><p>Loading payments...</p></div>;

  if (error) return <div><p className="text-red-500">Failed to load payments</p></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Payment Management</h1>
      </div>

      {/* Vendor Payments Report */}
      <div className={`bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} mb-6`}>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Vendor Payment Report</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Commission (15%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Net Payable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${theme === 'dark' ? 'bg-gray-900 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
              {payments.map((payment) => {
                const commission = payment.totalSales * 0.15;
                const netPayable = payment.totalSales - commission;
                
                return (
                  <tr key={payment.vendorId} className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {payment.vendorName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {payment.vendorEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${payment.totalSales?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                      -${commission.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                      ${netPayable.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.isPaid 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {payment.isPaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {!payment.isPaid && netPayable > 0 && (
                        <button
                          onClick={() => handleCreatePayout(payment.vendorId, netPayable)}
                          disabled={createPayout.isPending}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                          Create Payout
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {payments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No payment data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow p-6 border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Total Revenue
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  ${payments.reduce((sum, p) => sum + (p.totalSales || 0), 0).toFixed(2)}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow p-6 border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Platform Commission
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  ${payments.reduce((sum, p) => sum + ((p.totalSales || 0) * 0.15), 0).toFixed(2)}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow p-6 border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  Pending Payouts
                </dt>
                <dd className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  ${payments.filter(p => !p.isPaid).reduce((sum, p) => sum + ((p.totalSales || 0) * 0.85), 0).toFixed(2)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
