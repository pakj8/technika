import { Link } from 'react-router-dom'

const GuestNav = () => {
  return (
    <nav className='p-2 flex justify-between items-center'>
      <div className="logo">
        <Link to='/' className='flex items-center'>
          <img className='w-12' src="./technika.ico" alt="logo" />
        </Link>
      </div>
      <div style={{fontWeight: "20px"}} className="links px-4">
        <Link to='/login' className='mr-4 text-lg text-blue-500 hover:text-white'>Login</Link>
        <Link to='/register' className='mr-4 text-lg text-blue-500 hover:text-white'>Register</Link>
        <Link to='/events' className='mr-4 text-lg text-blue-500 hover:text-white'>Events</Link>
        
      </div>
    </nav>
  )
}

export default GuestNav