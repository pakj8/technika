import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvent } from '../../redux/actions/userActions'
import { Link, useParams } from 'react-router-dom'

const SingleEvent = () => {

  const { event } = useSelector(state => state.event)
  const dispatch = useDispatch()
  const { eventId } = useParams()

  useEffect(() => {
    dispatch(getEvent(eventId))
  }, [dispatch, eventId])

  return (
    <div className='p-4 bg-slate-200 h-screen'>
      {
        event._id ?
        <>
        <h1 className='text-xl font-semibold'>Event Detail</h1>
          <div className='flex flex-wrap gap-2 mt-4'>
            <img className='w-80' src={event.avatar.url} alt="" />
          <div className='flex flex-col'>
              <h1>Name: &nbsp; {event.name}</h1>
              <h1>Date: &nbsp; {new Date(event.date).toLocaleDateString()}</h1>
              <Link state={
                {
                  eventId: event._id,
                  eventName: event.name,
                  eventDate: event.date,
                  eventAvatar: event.avatar.url
                }
              } to='/registerEvent'

               className='w-fit mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Register
              </Link>
          </div>

      </div>
        </> :
      <div className='w-full text-center mt-5'>
        <p className='text-gray-500'>No events yet</p>
      </div>
      }
    </div>
  )
}

export default SingleEvent