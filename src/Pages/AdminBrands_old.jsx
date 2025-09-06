import React, { useState } from 'react';

import { useBrands, useCreateBrand, useDeleteBrand } from '../hooks/useEcommerceApi';
import useTheme from '../hooks/useTheme';

const AdminBrands = () => {
  const { theme } = useTheme();
  const { data, isLoading, error } = useBrands();
  const createBrand = useCreateBrand();
  const deleteBrand = useDeleteBrand();

  const [form, setForm] = useState({ name: '', description: '', logo: null });

  const brands = data?.data || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', form.name);
    if (form.description) fd.append('description', form.description);
    if (form.logo) fd.append('logo', form.logo);
    createBrand.mutate(fd, { onSuccess: () => setForm({ name: '', description: '', logo: null }) });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this brand?')) {
      deleteBrand.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Brands</h1>
      </div>

      <form onSubmit={handleSubmit} className={`mb-8 p-4 rounded border ${theme==='dark'?'bg-gray-900 border-gray-800':'bg-white border-gray-200'}`}>
        <div className="grid md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required className={`w-full px-3 py-2 rounded border ${theme==='dark'?'bg-gray-800 border-gray-700':'bg-white border-gray-300'}`} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <input value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className={`w-full px-3 py-2 rounded border ${theme==='dark'?'bg-gray-800 border-gray-700':'bg-white border-gray-300'}`} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo</label>
            <input type="file" onChange={e=>setForm(f=>({...f,logo:e.target.files[0]}))} className="w-full text-sm" />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">Create</button>
        </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to load brands</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map(brand => (
          <div key={brand._id} className={`p-4 rounded border ${theme==='dark'?'bg-gray-900 border-gray-800':'bg-white border-gray-200'}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{brand.name}</h3>
                {brand.description && <p className="text-sm text-gray-500 mt-0.5">{brand.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={()=>handleDelete(brand._id)} className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {!isLoading && brands.length === 0 && (
          <p className="text-sm text-gray-500">No brands found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBrands;
