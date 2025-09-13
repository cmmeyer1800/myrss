import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bulma/css/bulma.css'
import './styles.css'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
)
