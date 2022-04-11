import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ModalWidget from "../widgets/ModalWidget";

const RegisterEvent = () => {

  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='p-4 bg-slate-200 h-screen'>
      {
        showModal &&
        <ModalWidget setShowModal={setShowModal} showModal={showModal} />
      }
      <h1 className='text-xl font-semibold'>Register Event</h1>
      <div className='flex flex-wrap gap-2 mt-4'>
        <img className='w-80' src={location.state.eventAvatar} alt="" />
        <div className='flex flex-col'>

          <h1 className="text-2xl">Name: &nbsp; {location.state.eventName}</h1>
          <h1 className="text-2xl">Date: &nbsp; {new Date(location.state.eventDate).toLocaleDateString()}</h1>
          
            <h1 className="mt-4 text-2xl text-black font-semibold" >Select Members</h1>
            <div className="mt-2 flex flex-wrap" >
              {
                user.team.map(member => (
                  <div className="flex items-center mx-2" key={member.id}>
                    <input className="text-2xl mr-1" type="checkbox" name={member.name} id="" />
                    <h1 className="text-2xl">{member.name}</h1>
                  </div>
                ))
              }
            </div>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 w-fit mt-2 px-2 text-white rounded py-1 hover:bg-blue-600" >Register Now</button>
          </div>
        </div>
    </div>
  )
}

export default RegisterEvent