import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Input from '@/components/Input'
import Button from './Button'

import { createEvent, getEvents, updateEvent, deleteEvent } from '@/api/events'

export default function EventOverview() {
  const [modal, setModal] = useState(false)

  // create modal inputs
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [reminder, setReminder] = useState('')
  const [invitees, setInvitees] = useState('')
  const [loading, setLoading] = useState('')

  // update
  const [updateId, setUpdateId] = useState(-1)

  const fetchEvents = async () => {
    setLoading('getting')
    return getEvents().then(data => {
      setData(data.data)
      setLoading('')
    })
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const [data, setData] = useState<{
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    invitees: string;
    reminder: string
  }[]>([])

  const createEventHandle = () => {
    setLoading('creating')

    if (updateId == -1) {
      createEvent({
        title,
        description,
        date,
        location,
        reminder,
        invitees
      }).then(() => {
        fetchEvents().then(() => {
          resetModal()
        })
      })
    } else {
      updateEvent(updateId, {
        title,
        description,
        date,
        location,
        reminder,
        invitees
      }).then(() => {
        fetchEvents().then(() => {
          resetModal()
        })
      })
    }
  }

  const resetModal = () => {
    setModal(false)
    setTitle('')
    setDescription('')
    setReminder('')
    setInvitees('')
    setLocation('')
    setDate('')
    setUpdateId(-1)
  }

  const editTask = (id: number) => {
    const index = data.findIndex(e => e.id == id);
    if (index != -1) {
      const d = data[index]

      setUpdateId(id)
      setTitle(d.title)
      setDescription(d.description)
      setReminder(d.reminder)
      setInvitees(d.invitees)
      setLocation(d.location)
      setDate(d.date)

      setModal(true)
    }
  }

  const deleteTask = (id: number) => {
    deleteEvent(id).then(() => {
      fetchEvents()
    })
  }
 
  return (
    <>
      <section className="bg-white p-8 rounded-xl shadow-lg">
        <div className='flex w-full items-center justify-between'>
          <h2 className="text-3xl font-bold mb-6">Events</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => setModal(true)}>Add Event</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((event, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 relative rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute top-5 right-2">
                <button onClick={() => editTask(event.id)} type='button' className='p-2 bg-slate-200 hover:opacity-80 active:scale-95 mr-4'>
                  <svg width="24p" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button onClick={() => deleteTask(event.id)} type='button' className='p-2 bg-slate-200 hover:opacity-80 active:scale-95'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Title: {event.title}
              </h3>
              <p className="text-gray-600 mb-3">Description: {event.description}</p>
              <p className="text-gray-500 mb-3">Date: {event.date}</p>
              <p className="text-gray-500 mb-3">Location: {event.location}</p>
              <div className="relative pt-2">
                <p className="text-gray-500 text-sm">Invitees: {`${event.invitees}`}</p>
              </div>
            </div>
          ))}
        </div>

        {data.length == 0 && <div className="w-full mt-12 flex justify-center font-bold text-lg">No events available</div>}

        {loading === 'getting' && <div className="w-full mt-12 flex justify-center font-bold text-lg">Loading...</div>}
      </section>

      <Modal isOpen={modal} onClose={resetModal}>
        <h1 className="w-full text-center font-bold text-2xl">Create Events</h1>

        <label className='mt-12 font-bold ml-1 mb-2 block'>Title</label>
        <Input type="text" size="medium" placeholder='Enter Title' value={title} onChange={e => setTitle(e.target.value)} />
        
        <label className='mt-3 font-bold ml-1 mb-2 block'>Description</label>
        <Input type="textarea" size="medium" placeholder='Enter Description' value={description} onChange={e => setDescription(e.target.value)} />
        
        <label className='mt-3 font-bold ml-1 mb-2 block'>Date</label>
        <Input type="date" size="medium" placeholder='Enter date' value={date} onChange={e => setDate(e.target.value)} />
        
        <label className='mt-3 font-bold ml-1 mb-2 block'>Location</label>
        <Input type="text" size="medium" placeholder='Enter Location' value={location} onChange={e => setLocation(e.target.value)}  />
        
        <label className='mt-3 font-bold ml-1 mb-2 block'>Reminder time</label>
        <Input type="datetime-local" size="medium" placeholder='Reminder' value={reminder} onChange={e => setReminder(e.target.value)} />
        
        <label className='mt-3 font-bold ml-1 mb-2 block'>Invitees emails (separated by comma)</label>
        <Input type="textarea" size="medium" placeholder='Enter invitees' value={invitees} onChange={(e) => setInvitees(e.target.value)} /> 
 
        <Button disabled={loading === 'creating'} variant="primary" size="medium" className="mt-12 w-full" onClick={createEventHandle}>{updateId == -1 ? "Create" : "Update"} Event</Button>
      </Modal>
    </>
  );
}