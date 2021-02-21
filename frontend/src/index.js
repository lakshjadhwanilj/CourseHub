import React from 'react'
import ReactDOM from 'react-dom'
// CSS
import './assets/bootstrap.min.css'
import './index.css'
// Components
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();