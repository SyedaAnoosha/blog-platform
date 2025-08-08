import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import BlogForm from './components/BlogForm';
import BlogDetail from './components/BlogDetail';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create" element={<BlogForm />} />
          <Route path="edit/:id" element={<BlogForm />} />
          <Route path="blog/:id" element={<BlogDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);