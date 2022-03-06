import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Auth from './features/auth/Auth';
import MainLayout from './components/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<div>Not found</div>} />
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {<MainLayout />}
            </Suspense>
          }
        >
          <Route path="/" element={<>Table</>} />
          <Route path="/gallery" element={<>Gallery</>} />
          <Route path="/todolist" element={<>TodoList</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
