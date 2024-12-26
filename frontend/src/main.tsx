// En tu archivo principal (ejemplo: index.tsx)

// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from "@mantine/core";
import './index.css';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <MantineProvider withGlobalClasses>
      <QueryClientProvider client={queryClient}>
  
          <App />
 
      </QueryClientProvider>
    </MantineProvider>
  // </StrictMode>
);
