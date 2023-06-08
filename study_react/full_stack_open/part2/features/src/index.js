import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import App from './App';

axios.get('http://192.168.1.99:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes} />)
})