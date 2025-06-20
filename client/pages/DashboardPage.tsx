
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-200">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;