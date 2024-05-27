// src/app/tabs/page.jsx <= added by AlexHong

// src/app/tabs/page.jsx

import { useState } from 'react';
import styles from './Tabs.module.css';

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState('General Journal');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General Journal':
        return <div>General Journal Content</div>;
      case 'General Ledger':
        return <div>General Ledger Content</div>;
      case 'Monthly Income Statement':
        return <div>Monthly Income Statement Content</div>;
      case 'Inventory Stock Card':
        return <div>Inventory Stock Card Content</div>;
      case 'Purchasing Order':
        return <div>Purchasing Order Content</div>;
      case 'Paid Sale Invoice':
        return <div>Paid Sale Invoice Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <nav>
          <button onClick={() => setActiveTab('General Journal')}>General Journal</button>
          <button onClick={() => setActiveTab('General Ledger')}>General Ledger</button>
          <button onClick={() => setActiveTab('Monthly Income Statement')}>Monthly Income Statement</button>
          <button onClick={() => setActiveTab('Inventory Stock Card')}>Inventory Stock Card</button>
          <button onClick={() => setActiveTab('Purchasing Order')}>Purchasing Order</button>
          <button onClick={() => setActiveTab('Paid Sale Invoice')}>Paid Sale Invoice</button>
        </nav>
      </header>
      <main className={styles.main}>
        {renderTabContent()}
      </main>
    </div>
  );
};

export default TabsPage;


