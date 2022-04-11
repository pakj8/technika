import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllEvents } from '../../redux/actions/userActions'
import EventCard from '../widgets/EventCard'

const Events = () => {

  const { events } = useSelector(state => state.event)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])


  return (
    <div className='p-4'>
      <h1 style={{color: "white"}} className='font-semibold'>Events</h1>
      <div className='flex flex-wrap gap-2 '>

      {
        events.length > 0 ?
        events.map(event => (
          <EventCard key={event.id} event={event} />
        )) : 
        <div className='w-full text-center mt-5'>
          <p className='text-gray-500'>No events yet</p>
        </div>
      }
      </div>
    </div>
  )
}

export default Events