// import { Outlet, Navigate } from "react-router-dom"

// const ProtectedRoute = ({isLoggedIn}) => {

//   return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  
// }

// export default ProtectedRoute


// Protected Route for Admin, User, and Guest
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoute = ({isAuthenticated, ...rest}) => {

  return isAuthenticated ? <Outlet {...rest} /> : <Navigate to="/login" />

}

export default ProtectedRoute
