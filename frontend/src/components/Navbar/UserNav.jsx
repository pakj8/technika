import { Link } from 'react-router-dom'

const UserNav = ({handleLogout}) => {
  return (
    <nav className='p-2 flex justify-between items-center'>
      <div className="logo">
        <Link to='/team' className='flex items-center'>
          <img className='w-12' src="./technika.ico" alt="logo" />
        </Link>
      </div>
      <div className="links px-4">
        
        <Link to='/team' className='mr-4 text-lg text-gray-500 hover:text-gray-900'>My Team</Link>
        <Link to='/events' className='mr-4 text-lg text-gray-500 hover:text-gray-900'>Events</Link>
        <Link to='/about' className='mr-12 text-lg text-gray-500 hover:text-gray-900'>About</Link>
        <button onClick={handleLogout} className='text-lg bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded shadow'>Logout</button>
      </div>
    </nav>
  )
}

export default UserNav