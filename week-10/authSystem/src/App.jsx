import AuthSystem from './components/AuthSystem';
import './Auth.css';
import { useState } from 'react';
import {CountContextProvider} from './context/authContext.jsx'
function App() {
  return (
    <CountContextProvider>
      <AuthSystem/>
    </CountContextProvider>
  );
}

export default App;
