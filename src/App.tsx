import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { CharacterPage } from './components/Character/CharacterPage';
import { HomePage } from './components/Home/HomePage';


const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
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
