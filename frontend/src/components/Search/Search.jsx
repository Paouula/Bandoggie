import { useState, useEffect } from 'react'
import ItemList from './ItemList.jsx';
import Input from './Input.jsx';
import { useGetUsers } from '../../hooks/useGetUsers.jsx';
//import './search.css'; // Importar el CSS


function App() {
  const {users, loading, error} = useGetUsers()
  const [filteredUsers, setFilteredUsers] = useState([])

  // fetch de los users
  useEffect(() => {
    if (Object.keys(users).length > 0) {
      setFilteredUsers(users)
    }
  }, [users])

  const filterItems = (searchTerm) => { 
    // we now use 'users' instead of 'apiUsers' to do the filtering
    const filteredItems = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  return (
    <div className="search-container">
      
      <Input onChangeCallback={filterItems} />
      
      {loading && (
        <div className="loading-message">
          <div className="loading-spinner"></div>
          Cargando usuarios...
        </div>
      )}
      
      {error && (
        <div className="error-message">
          ⚠️ Hubo un error al cargar los usuarios
        </div>
      )}
      
      {!loading && !error && (
        <>
          <div className="results-counter">
            {filteredUsers.length} usuario{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
          </div>
          <ItemList items={filteredUsers} />
        </>
      )}
    </div>
  )
}
    
export default App