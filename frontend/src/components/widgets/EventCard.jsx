import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({event}) => {
  return (
    <Link to={`/events/${event._id}`} className='w-full max-w-sm rounded bg-white overflow-hidden shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:shadow-2xl'>
      <img className='w-full h-60' src={event.avatar.url} alt='Sunset in the mountains' />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{event.name}</div>
        <p className='text-gray-700 text-base'>
          {/* show updated date */}
          {new Date(event.date).toLocaleDateString()}
        </p>
      </div>
    </Link>
  )
}

export default EventCard