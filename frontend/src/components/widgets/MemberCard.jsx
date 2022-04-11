import { useDispatch } from "react-redux"
import { deleteMember } from "../../redux/actions/userActions"

const MemberCard = ({member}) => {

  const dispatch = useDispatch()

  const handleDelete = () => {
    console.log(member.email);
    dispatch(deleteMember(member.email))
  }

  return (
    <div className='w-fit bg-white drop-shadow-lg rounded p-4'>
      <h1 className='text-xl font-semibold'>{member.fullname}</h1>
      <p>{member.email}</p>
      <p>{member.phone}</p>
      <button onClick={handleDelete} className='bg-red-500 px-1 mt-2 rounded text-white' >Remove</button>
    </div>
  )
}

export default MemberCard