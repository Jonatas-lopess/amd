import { Route, Routes } from 'react-router-dom';
import { ErrorPage } from './components/Error';
import Home from './components/Home';

const App = () => {
  return <Routes>
    <Route path='/:id/:contrato' element={<Home />} />
    <Route path='*' element={<ErrorPage message={"Error 404 - Page not found"} />} />
  </Routes>
};

export default App;
