import React,{useState, useEffect} from 'react'
import CalendarHeader from '../component/calendar/calendarHeader/calendarHeader'
import SingleDay from '../component/calendar/calendarSingleDay/singleDay'
import UseDates from '../component/calendar/calenderHook/useDates'
import EventCreateModal from '../component/EventModal/createEvent/eventCreateModal'
import EventDetail from '../component/EventModal/EventDetail/eventDetail'
import '../scss/App.scss'

export default function FullCalendar() {
    const [latestMonth, setLatestMonth] = useState(0);
    const [clickedDate, setClickedDate] = useState();
    const [events, setEvents] = useState([]);

  const checkEvent = date => events.find(e => e.date === date);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, monthName } = UseDates(events, latestMonth);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent])
    setClickedDate(null);
  }

  const updateEvent = (event) => {
    const updateEventData = events.map(item=>{
        if(item.date === clickedDate){
            return {
                ...item, title:event.title, date:clickedDate, description:event.description
            }
        }
        return item
    })
    setEvents(updateEventData)
    setClickedDate(null)
  }

  const deleteEvent = () => {
    setEvents(events.filter(event => event.date !== clickedDate));
    setClickedDate(null);
  }

  const closeModal = () => {
    setClickedDate(null)
  }

  console.log("Tasks", events)


  return (
    <div className="full-calendar-section">
        <div className="full-calendar-contents">
            <div className="calendar-header">
                <CalendarHeader
                    monthName={monthName}
                    latestMonth={latestMonth}
                    setLatestMonth={setLatestMonth}
                />
            </div>
            <div className="calendar-week-days">
               <div className="calendar-day-name">Sun</div>
               <div className="calendar-day-name">Mon</div>
               <div className="calendar-day-name">Tue</div>
               <div className="calendar-day-name">Wed</div>
               <div className="calendar-day-name">Thu</div>
               <div className="calendar-day-name">Fri</div>
               <div className="calendar-day-name">Sat</div>
            </div>
            <div className="main-calendar">
                {
                    days.map((day, key)=>(
                        <SingleDay
                            key={key}
                            day={day}
                            onClick={()=>{
                                if(day.value !== 'previousMonth'){
                                    setClickedDate(day.date);
                                } 
                            }}
                        />
                    ))
                }
            </div>
        </div>
        {
            clickedDate &&  !checkEvent(clickedDate) &&
            <EventCreateModal 
                closeModal={closeModal}
                addEvent={addEvent}
                clickedDate={clickedDate}
            />
        }
        {
           clickedDate && checkEvent(clickedDate)&&
           <EventDetail
               checkEvent={checkEvent}
               clickedDate={clickedDate}
               closeModal={closeModal}
               updateEvent={updateEvent}
              deleteEvent={deleteEvent}
           />
        }
    </div>
  )
}

