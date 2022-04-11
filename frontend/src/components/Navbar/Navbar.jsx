import { useDispatch, useSelector } from 'react-redux'
import UserNav from './UserNav'
import AdminNav from './AdminNav'
import GuestNav from './GuestNav'

const Navbar = ({isAuthenticated, user}) => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div>
      {
        !isAuthenticated ? (
          <>
            <GuestNav />
          </>
        ) : user.role === 'user' ? (
          <UserNav handleLogout={handleLogout} />
        ) : (
          <AdminNav handleLogout={handleLogout} />
        )
      }
    </div>
  )
}

export default Navbar