import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { appStore } from './store/store.js';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={appStore}>
            <App />
        </Provider>
    </StrictMode>,
);
