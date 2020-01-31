import React from 'react';
// import { StripeProvider } from 'react-stripe-elements';
import './reset.css';
import './App.css';
import route from './routes';
function App() {
  return (
    // <StripeProvider apiKey="pk_test_lSWosfxST1JdbS9FvbzTZLHW00US8hMmSO">

      <div className="App">
        {route}
      </div>
    // </StripeProvider>
  );
}

export default App;
