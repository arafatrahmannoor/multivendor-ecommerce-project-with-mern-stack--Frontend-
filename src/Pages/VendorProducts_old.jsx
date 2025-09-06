import React, { useState } from 'react';
import AdminLayout from '../Layouts/AdminLayout';
import { useVendorProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useEcommerceApi';
import { useCategories, useBrands } from '../hooks/useEcommerceApi';
import useTheme from '../hooks/useTheme';

const VendorProducts = () => {
  const { theme } = useTheme();
  const { data: productsData, isLoading, error } = useVendorProducts();
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    images: []
  });

  const products = productsData?.products || [];
  const categories = categoriesData?.data?.categories || [];
  const brands = brandsData?.data?.brands || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('description', formData.description);
    fd.append('price', formData.price);
    fd.append('category', formData.category);
    if (formData.brand) fd.append('brand', formData.brand);
    
    formData.images.forEach(image => {
      fd.append('images', image);
    });

    if (editingId) {
      updateProduct.mutate({ id: editingId, formData: fd });
    } else {
      createProduct.mutate(fd, { 
        onSuccess: () => {
          setShowForm(false);
          setFormData({ name: '', description: '', price: '', category: '', brand: '', images: [] });
        }
      });
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category?._id || '',
      brand: product.brand?._id || '',
      images: []
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', price: '', category: '', brand: '', images: [] });
    setShowForm(false);
  };

  if (isLoading) return <AdminLayout><p>Loading products...</p></AdminLayout>;

  if (error) return <AdminLayout><p className="text-red-500">Failed to load products</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className={`bg-white dark:bg-gray-900 rounded-lg shadow p-6 border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} mb-6`}>
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Brand</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFormData(prev => ({ ...prev, images: Array.from(e.target.files) }))}
                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={createProduct.isPending || updateProduct.isPending}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {createProduct.isPending || updateProduct.isPending ? 'Saving...' : (editingId ? 'Update' : 'Create')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className={`bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
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
              {products.map((product) => (
                <tr key={product._id} className={`${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {product.images && product.images.length > 0 && (
                        <img
                          src={`http://localhost:3000${product.images[0]}`}
                          alt={product.name}
                          className="w-10 h-10 rounded-md object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.category?.name || 'No Category'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    ${product.price?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        disabled={deleteProduct.isPending}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No products found. Create your first product!</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default VendorProducts;
