import { Link } from 'react-router-dom'

const AdminNav = ({handleLogout}) => {
  return (
    <nav className='navbar p-2 flex justify-between items-center'>
      <div className="logo">
        <Link to='/' className='flex items-center'>
          <img className='w-12' src="./technika.ico" alt="logo" />
        </Link>
      </div>
      <div className="links px-4">
        <Link to='/dashboard' className='mr-4 text-lg text-white-500 hover:text-white-900'>Dashboard</Link>
        <Link to='/team' className='mr-4 text-lg text-blue-500 hover:text-white'>My Team</Link>
        <Link to='/about' className='mr-4 text-lg text-blue-500 hover:text-white'>About</Link>
        <button onClick={handleLogout} className='text-lg bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded shadow'>Logout</button>
      </div>
    </nav>
  )
}

export default AdminNav