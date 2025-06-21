import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardContent from './DashboardContent'; // Import the new DashboardContent component

const DashboardPage: React.FC = () => {
  return (
    // Main container for the dashboard layout
    <div className="flex flex-col h-screen bg-gray-100 font-inter">
      <Header /> {/* Your global header component */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar /> {/* The sidebar component */}
        <main className="flex-1 overflow-y-auto"> {/* Main content area, allows scrolling */}
          {/* DashboardContent will render the appropriate component based on nested routes */}
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
