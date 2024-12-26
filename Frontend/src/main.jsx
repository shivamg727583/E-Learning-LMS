import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './redux/store'
import { Toaster } from './components/ui/sonner';
import LoadingSpinner from './components/LoadingSpinner'
import { useLoadUserQuery } from './feature/api/authApi'

const Custom = ({ children }) => { 
  const { isLoading } = useLoadUserQuery(); 
  
  return (
    <>
      {isLoading ? <LoadingSpinner /> : <>{children}</>}
    </>
  );
};


createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>

<Custom>
<App />
<Toaster/>

</Custom>

  </Provider>
   
  
)
