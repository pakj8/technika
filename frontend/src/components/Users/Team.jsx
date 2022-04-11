import membersList from '../../mockData/members.json'
import { useState } from 'react'
import MemberCard from '../widgets/MemberCard'
import { useSelector, useDispatch } from 'react-redux'
import { addMember, getUser } from '../../redux/actions/userActions'

const Team = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMember = {
      name,
      email,
      phone
    }

    dispatch(addMember(newMember))
    dispatch(getUser())
  }


  return (
    <div style={{overFlow: "hidden"}} className='p-4 h-screen'>
      <h1 style={{color: 'white',position: 'relative', left: "550px"}} className='text-xl font-semibold'>Add Members</h1>

      {/* add member */}
      <div style={{position: 'relative', left: "400px"}} className='flex justify-between flex-col'>
        <div className='w-1/3 mt-2'>
          <input onChange={(e) => setName(e.target.value)} value={name} className='w-full p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='text' placeholder='Enter Fullname' />
        </div>
        <div className='w-1/3 mt-2'>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='email' placeholder='Enter Email' />
        </div>
        <div className='w-1/3 mt-2'>
          <input onChange={(e) => setPhone(e.target.value)} value={phone} className='w-full p-2 bg-gray-200 rounded border border-gray-500 focus:bg-slate-50' type='phone' placeholder='Enter Phone Number' />
        </div>
        <div className='w-1/3 mt-2'>
          <button onClick={handleSubmit} className='w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600'>Add Member</button>
        </div>
      </div>

      <h1 style={{color: 'white'}} className='text-xl font-semibold mt-4'>Members</h1>
      <div className='flex flex-wrap gap-2 mt-4'>
        {
          user.team.length > 0 ?
          user.team.map(member => (
          <MemberCard key={member.id} member={member} />
        )) : 
        <div className='w-full text-center mt-5'>
          <p style={{color: "white"}} className='text-gray-500'>No members yet</p>
        </div>
        }
      </div>
    </div>
  )
}

export default Team