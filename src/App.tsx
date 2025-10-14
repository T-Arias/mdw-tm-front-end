import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { User } from './types/user';
import { PlayerListComponent } from './components/PlayerListComponent';
import { fetchUser } from './services/userService';

function App() {
  const [count, setCount] = useState(1);
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const handlerOnClick = (countParam:number) => {
    setCount(countParam + 1);
    setUser('Tomas');
  }

  useEffect(() => {
    console.log('componente montado');
    async function fetchUserData() {
      const userJson = await fetchUser();
      setUsers(userJson);
    }
    fetchUserData();
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        {user &&
          <h1>Bienvenido usuario {user}</h1>
        }

        {/* <ol>
          {users.map((user: User) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ol> */}
        <PlayerListComponent users={users}/>


        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => handlerOnClick(count)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
