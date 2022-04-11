import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../redux/actions/userActions'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [contingent, setContingent] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
      e.preventDefault();
      const newUser = {
        email: email,
        password: password,
        name: name,
        phone: phone,
        contingent: contingent
      }
    
      dispatch(register(newUser))
    }

    const { isAuthenticated, user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
      if (isAuthenticated) {
        if (user.role === 'admin') {
          navigate('/team')
        } else {
          navigate('/team')
        }
      }
    }, [isAuthenticated])

  return (
    <div className='w-full h-screen bg-slate-900 flex justify-center items-center'>
      <div className='bg-white w-1/3 p-4 rounded'>
        <h1 className='text-2xl font-semibold'>Register</h1>
          <div className='mt-4'>
            <label className='text-sm font-semibold'>Name</label>
              <input onChange={(e) => setName(e.target.value)} className='mt-2 w-full mb-2 p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='text' placeholder='Enter Fullname' />
            <label className='text-sm font-semibold'>Contingent</label>
              <input onChange={(e) => setContingent(e.target.value)} className='mt-2 w-full mb-2 p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='text' placeholder='Enter Contingent' />
            <label className='text-sm font-semibold'>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} className='mt-2 w-full mb-2 p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='email' placeholder='Enter Username' />
            <label className='text-sm font-semibold'>Phone</label>
              <input onChange={(e) => setPhone(e.target.value)} className='mt-2 w-full mb-2 p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='phone' placeholder='Enter Phone Number' />
            <label className='text-sm font-semibold '>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} className='mt-2 w-full p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='password' placeholder='Enter Password' />
            <div className='mt-4'>
              <button onClick={handleSubmit} className='w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600'>Reigtser</button>
            </div>
            <div className='mt-4'>
              Already a User?<Link to='/login' className='w-full ml-2 mt-4 text-md font-semibold text-blue-500 hover:text-blue-600'>Login</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Register