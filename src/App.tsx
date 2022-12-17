import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Layout } from './components/Layout/Layout';
import { CharacterPage } from './components/Character/CharacterPage';


const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<h1>Register</h1>} />
          <Route path='/login' element={<h1>Login</h1>} />
          <Route path='/character/:id' element={<CharacterPage/>} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
