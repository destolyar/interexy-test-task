import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CharacterPage } from './components/Character/CharacterPage';
import { HomePage } from './components/Home/HomePage';
import { NotFound } from './components/NotFound/NotFound';
import { Register } from './components/Authentification/Register';
import { Login } from './components/Authentification/Login';


const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/character/:id' element={<CharacterPage/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
