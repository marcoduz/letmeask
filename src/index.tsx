import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '../src/services/firebase';
import '../src/styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);