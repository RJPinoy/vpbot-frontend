import * as React from 'react'
import './App.css'
import Dashboard from './components/pages/user/Dashboard';
import { setDefaultLocalStorage } from './utils';

function App() {
  React.useEffect(() => {
    setDefaultLocalStorage();
  }, [])
  return (
    <>
      <Dashboard />
    </>
  )
}

export default App;