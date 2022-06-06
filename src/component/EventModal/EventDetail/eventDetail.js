import React, { useState } from 'react'
import '../../../scss/App.scss'
import ViewEventModal from '../viewEvent/viewEventModal';

export default function EventDetail(props) {

    const {checkEvent, clickedDate, closeModal, updateEvent, deleteEvent} = props;
    const eventData = checkEvent(clickedDate)
    const [isAppear, setIsAppear] = useState(false);

    const editEventDetails = () => {
        closeModal()
        setIsAppear(true)
        console.log("clicked ....");
    }

  console.log("edit", isAppear);
  return (
    <div className='event-detail-container'>
      <div className="event-contents">
         <div className="event-detail-box">
             <div className="event-title">
                 <label>Title</label>
                 <h3>{eventData.title}</h3>
             </div>
             <div className="event-description">
                 <label>Description</label>
                 <p>{eventData.description}</p>
             </div>
              <div className="button-areas">
                  <button className='main-btn btn-cornflower' onClick={editEventDetails}>Edit</button>
                  <button className="main-btn btn-cornflower" onClick={deleteEvent}>Delete</button>
              </div>
         </div>
      </div>
    <div className="modal-backdrop" onClick={closeModal}></div>
    {
        isAppear && <ViewEventModal
            checkEvent={checkEvent}
            clickedDate={clickedDate}
            closeModal={closeModal}
            updateEvent={updateEvent}
        />
    }
    </div>
  )
}
