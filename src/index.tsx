import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'

import { RigProvider } from './context/RigContext'; // tänne hyvä jakaa

// Add a global CSS to remove default body margin and padding
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.backgroundColor = 'black';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RigProvider>
      <App />
    </RigProvider>
  </React.StrictMode>
);

