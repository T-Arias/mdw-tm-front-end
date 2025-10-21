import './App.css'
import { Link } from 'react-router';
import { AppRouter } from './Router/AppRouter';

function App() {
  return (
    <>
      <nav>
        <Link to={'/home'}>Home</Link>
        <Link to={'/admin'}>Admin</Link>
        <Link to={'/analytics'}>analytics</Link>
        <Link to={'/home'}>Home</Link>
      </nav>
      <AppRouter />

    </>
  )
}

export default App
