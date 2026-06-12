import React, { useState } from 'react';
import Card from '../components/Card';
import TailwindButton from '../components/atoms/TailwindButton';
import FormField from '../components/molecules/FormField';
import DataGrid from '../components/organisms/DataGrid';
import { FadeIn, SlideInLeft } from '../animations/PageTransitions';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const sampleUsers = [
    { id: "1", name: "Alexander McQueen", email: "alex@enterprise.internal", status: "Active" },
    { id: "2", name: "Charlotte York", email: "charlotte@enterprise.internal", status: "Active" },
    { id: "3", name: "Dominic Toretto", email: "dom@enterprise.internal", status: "Inactive" }
  ];

  const handleNodeAction = (user) => {
    alert("Targeting System Node Config Matrix for: " + user.name);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Animation Wrapper Input Wrapper */}
      <SlideInLeft>
        <div className="border-b border-gray-200 pb-5">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Control Plane Dashboard v2</h2>
          <p className="mt-2 text-sm text-gray-500">Manage real-time micro-services and deployment structures node bindings.</p>
        </div>
      </SlideInLeft>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <FadeIn delay="0">
          <Card style={{ borderTop: '4px solid #3b82f6' }}>
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Core Platform Ingestion Node</h4>
            <div className="mt-2 text-2xl font-bold">341 Online</div>
          </Card>
        </FadeIn>
        
        <FadeIn delay="100">
          <Card style={{ borderTop: '4px solid #10b981' }}>
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Average API Flight Processing</h4>
            <div className="mt-2 text-2xl font-bold">4.21 ms</div>
          </Card>
        </FadeIn>

        <FadeIn delay="200">
          <Card style={{ borderTop: '4px solid #f59e0b' }}>
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Data Cache Match Hit Ratio</h4>
            <div className="mt-2 text-2xl font-bold">98.24 %</div>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay="300">
        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Cluster Operational System Node Registration Registries</h3>
          <div className="max-w-md">
            <FormField 
              label="Interactive Identity Context Filter" 
              placeholder="Query structural string indexes (e.g., admin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DataGrid 
            headers={["Operator Entity", "Network Endpoint Identifier", "Internal Operational Status"]} 
            records={sampleUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))}
            onActionClick={handleNodeAction}
          />
        </div>
      </FadeIn>
    </div>
  );
}