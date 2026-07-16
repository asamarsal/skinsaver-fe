'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function McpDemoPage() {
  const [serviceId, setServiceId] = useState('wishlist_audit');
  const [inputJson, setInputJson] = useState('{\n  "products": ["CeraVe Cleanser", "The Ordinary Niacinamide"],\n  "budget": "medium"\n}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const simulateAgentCall = async () => {
    try {
      setLoading(true);
      setResponse(null);

      let parsedInput;
      try {
        parsedInput = JSON.parse(inputJson);
      } catch (err) {
        toast.error('Invalid JSON input format');
        setLoading(false);
        return;
      }

      const res = await api.post('/mcp/task', {
        task_id: `task_${Date.now()}`,
        service_id: serviceId,
        input: parsedInput
      }, {
        headers: {
          'X-OKX-Agent-Signature': 'mock_signature_for_hackathon',
          'X-OKX-Agent-ID': 'agent_123'
        }
      });

      setResponse(res.data);
      toast.success('Agent task completed!');
    } catch (err: any) {
      console.error(err);
      toast.error('Agent task failed');
      setResponse(err.response?.data || { error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Developer Tools
            </div>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">A2MCP Integration Demo</h1>
          <p className="text-gray-500 mb-8 text-sm">
            Simulate an OKX.AI Agent calling the SkinSaver ASP via Agent-to-Multi-Agent Communication Protocol.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Col: Request */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Service ID</label>
                <select
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={serviceId}
                  onChange={(e) => {
                    setServiceId(e.target.value);
                    if (e.target.value === 'wishlist_audit') {
                      setInputJson('{\n  "products": ["CeraVe Cleanser", "The Ordinary Niacinamide"],\n  "budget": "medium"\n}');
                    } else if (e.target.value === 'skin_analysis') {
                      setInputJson('{\n  "product_name": "COSRX Snail Mucin"\n}');
                    } else if (e.target.value === 'premium_report') {
                      setInputJson('{\n  "wishlist": ["COSRX Snail Mucin"]\n}');
                    }
                  }}
                >
                  <option value="wishlist_audit">wishlist_audit</option>
                  <option value="skin_analysis">skin_analysis</option>
                  <option value="premium_report">premium_report</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Task Input (JSON)</label>
                <textarea
                  className="w-full bg-gray-900 text-green-400 font-mono text-xs rounded-xl p-4 h-48 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={inputJson}
                  onChange={(e) => setInputJson(e.target.value)}
                />
              </div>

              <button
                onClick={simulateAgentCall}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? 'Simulating...' : 'Simulate OKX Agent Call →'}
              </button>
            </div>

            {/* Right Col: Response */}
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Agent Response</label>
              <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden relative min-h-[300px]">
                {response ? (
                  <pre className="p-4 text-xs font-mono text-blue-300 overflow-auto h-full absolute inset-0">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm font-medium">
                    Waiting for agent call...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
