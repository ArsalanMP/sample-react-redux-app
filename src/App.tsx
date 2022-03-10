import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Auth from './features/auth/Auth';
import MainLayout from './components/MainLayout';
import DataTable from './features/dataTable/DataTable';
import Gallery from './features/gallery/Gallery';
import Tasks from './features/tasks/Tasks';

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
          <Route path="/" element={<DataTable />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/tasksList" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
