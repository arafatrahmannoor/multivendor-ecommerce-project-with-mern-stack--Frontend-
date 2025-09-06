import React, { useState, useEffect } from 'react';
import apiClient from '../lib/axios';
import useTheme from '../hooks/useTheme';

const APITest = () => {
  const { theme } = useTheme();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testEndpoints = async () => {
    setLoading(true);
    const tests = [
      { name: 'Products', endpoint: '/api/products?limit=3' },
      { name: 'Categories', endpoint: '/api/categories' },
      { name: 'Brands', endpoint: '/api/brands' },
    ];

    const testResults = {};
    
    for (const test of tests) {
      try {
        const response = await apiClient.get(test.endpoint);
        testResults[test.name] = {
          success: true,
          data: response.data,
          status: response.status
        };
      } catch (error) {
        testResults[test.name] = {
          success: false,
          error: error.message,
          status: error.response?.status || 'Network Error'
        };
      }
    }
    
    setResults(testResults);
    setLoading(false);
  };

  useEffect(() => {
    testEndpoints();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API Connection Test</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Testing database connections and API endpoints
        </p>
        <button 
          onClick={testEndpoints}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Retest APIs'}
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(results).map(([name, result]) => (
          <div 
            key={name}
            className={`p-4 rounded-lg border ${
              result.success 
                ? (theme === 'dark' ? 'bg-green-900 border-green-700' : 'bg-green-50 border-green-200')
                : (theme === 'dark' ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200')
            }`}
          >
            <h3 className="font-semibold flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${result.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {name} API - Status: {result.status}
            </h3>
            {result.success ? (
              <pre className="mt-2 text-sm overflow-auto max-h-40">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            ) : (
              <p className="mt-2 text-sm">Error: {result.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default APITest;
