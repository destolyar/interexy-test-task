import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Layout } from './components/Layout/Layout';
import './App.scss';


const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<h1>Register</h1>} />
          <Route path='/login' element={<h1>Login</h1>} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
