import React from 'react';

import { useAdminOrders, useUpdateOrderStatus, useRefundPayment } from '../hooks/useEcommerceApi';
import useTheme from '../hooks/useTheme';

const AdminOrders = () => {
  const { theme } = useTheme();
  const { data, isLoading, error } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();
  const refundPayment = useRefundPayment();

  const orders = data?.data || [];

  const handleStatusChange = (id, status) => {
    updateStatus.mutate({ id, status });
  };

  const handleRefund = (orderId) => {
    const reason = prompt('Refund reason?');
    if (reason) {
      refundPayment.mutate({ orderId, reason });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to load orders</p>}
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className={`p-4 rounded border ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-sm text-gray-500">{order.user?.name || 'Unknown user'}</p>
                <p className="text-sm text-gray-500">Total: ${order.totalAmount?.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`text-sm rounded px-2 py-1 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                >
                  {['pending','processing','shipped','delivered','cancelled'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleRefund(order._id)}
                  className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >Refund</button>
              </div>
            </div>
            <div className="mt-3 grid gap-2 text-sm">
              {order.items?.map(item => (
                <div key={item._id} className="flex items-center justify-between">
                  <span>{item.product?.name}</span>
                  <span>x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!isLoading && orders.length === 0 && (
          <p className="text-gray-500 text-sm">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
