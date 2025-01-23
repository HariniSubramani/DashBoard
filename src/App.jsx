import React from 'react';
import { Space } from 'antd';
import './App.css';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import PageContent from './components/PageContent';
import SideMenu from './components/SideMenu';

function App() {
  return (
    <div className='App'>
      <AppHeader />
      <div className='SideMenuAndPageContent'>
        <SideMenu />
        <PageContent />
      </div>
      <AppFooter />
    </div>
  );
}

export default App;