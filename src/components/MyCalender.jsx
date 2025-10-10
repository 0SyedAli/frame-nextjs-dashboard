// "use client";

// import { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import '../styles/calender.css';

// export default function CalendarPage() {
//   const [events, setEvents] = useState([]);
//   const [resources, setResources] = useState([]);

//   useEffect(() => {
//     // Sample data - replace with your API call
//     const sampleAppointments = [
//       {
//         "_id": "68e3f78ebfe141c29cdf3500",
//         "userId": "680174698d70183301045338",
//         "adminId": "68a8a2dc13339119a22d6613",
//         "clientName": "Albert Lobo",
//         "date": "18-10-2025",
//         "categoryId": "68a8ae8a0afd4681ab808344",
//         "services": null,
//         "stylist": "68dffbd8a370c3a907918a9a",
//         "timeSlot": "11:00 AM",
//         "price": 190,
//         "status": "Pending",
//         "createdAt": "2025-10-06T17:08:30.506Z",
//         "updatedAt": "2025-10-06T17:08:30.506Z",
//         "__v": 0
//       },
//       {
//         "_id": "68e3f7b5bfe141c29cdf350a",
//         "userId": "680174698d70183301045338",
//         "adminId": "68a8a2dc13339119a22d6613",
//         "clientName": "John Doe",
//         "date": "10-10-2025",
//         "categoryId": "68a8ae8a0afd4681ab808345",
//         "services": "Haircut & Shave",
//         "stylist": "68dffbd8a370c3a907918a9a",
//         "timeSlot": "10:00 AM",
//         "price": 190,
//         "status": "Confirmed",
//         "createdAt": "2025-10-06T17:09:09.050Z",
//         "updatedAt": "2025-10-06T17:09:09.050Z",
//         "__v": 0
//       }
//     ];

//     const formattedEvents = formatAppointmentsForCalendar(sampleAppointments);
//     setEvents(formattedEvents);
//   }, []);

//   const formatAppointmentsForCalendar = (appointments) => {
//     return appointments.map(appointment => {
//       const [day, month, year] = appointment.date.split('-');
//       const formattedDate = `${year}-${month}-${day}`;
      
//       // Time conversion for week view
//       const timeString = appointment.timeSlot;
//       let hours = parseInt(timeString.split(':')[0]);
//       const minutes = timeString.split(':')[1]?.split(' ')[0] || '00';
//       const period = timeString.includes('PM') ? 'PM' : 'AM';
      
//       if (period === 'PM' && hours < 12) hours += 12;
//       if (period === 'AM' && hours === 12) hours = 0;
      
//       const startTime = `${formattedDate}T${hours.toString().padStart(2, '0')}:${minutes}:00`;
//       const endHours = (hours + 1) % 24;
//       const endTime = `${formattedDate}T${endHours.toString().padStart(2, '0')}:${minutes}:00`;
      
//       return {
//         id: appointment._id,
//         title: appointment.clientName, // Simple title for fallback
//         start: startTime,
//         end: endTime,
//         resourceId: appointment.stylist,
//         extendedProps: {
//           clientName: appointment.clientName,
//           category: getCategoryName(appointment.categoryId),
//           timeSlot: appointment.timeSlot,
//           price: appointment.price,
//           status: appointment.status,
//           services: appointment.services
//         },
//         color: getEventColor(appointment.status)
//       };
//     });
//   };

//   // Category IDs to names mapping
//   const getCategoryName = (categoryId) => {
//     const categories = {
//       "68a8ae8a0afd4681ab808344": "Haircut",
//       "68a8ae8a0afd4681ab808345": "Beard Styling",
//       "68a8ae8a0afd4681ab808346": "Hair Color"
//     };
//     return categories[categoryId] || "Service";
//   };

//   const getEventColor = (status) => {
//     switch (status) {
//       case 'Pending': return '#ffc107';
//       case 'Confirmed': return '#28a745';
//       case 'Completed': return '#17a2b8';
//       case 'Cancelled': return '#dc3545';
//       default: return '#6c757d';
//     }
//   };

//   // Custom Event Content Renderer
//   const renderEventContent = (eventInfo) => {
//     const extendedProps = eventInfo.event.extendedProps;
    
//     return {
//       html: `
//         <div class="custom-event">
//           <div class="event-client">${extendedProps.clientName}</div>
//           <div class="event-details">
//             <span class="event-category">${extendedProps.category}</span>
//             <span class="event-time">${extendedProps.timeSlot}</span>
//           </div>
//         </div>
//       `
//     };
//   };

//   const handleEventClick = (clickInfo) => {
//     const event = clickInfo.event;
//     const extendedProps = event.extendedProps;
    
//     alert(`
//       Client: ${extendedProps.clientName}
//       Service: ${extendedProps.category}
//       Time: ${extendedProps.timeSlot}
//       Price: $${extendedProps.price}
//       Status: ${extendedProps.status}
//     `);
//   };

//   return (
//     <div className='calendar-container'>
//       <FullCalendar
//         plugins={[
//           resourceTimelinePlugin,
//           dayGridPlugin,
//           interactionPlugin,
//           timeGridPlugin,
//         ]}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek'
//         }}
//         initialView='dayGridMonth'
//         nowIndicator={true}
//         editable={true}
//         selectable={true}
//         selectMirror={true}
//         resources={[
//           { id: '68dffbd8a370c3a907918a9a', title: 'Stylist 1', eventColor: 'pink' }
//         ]}
//         events={events}
//         eventContent={renderEventContent}
//         eventClick={handleEventClick}
//         height={600}
//         schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
//       />
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import timeGridPlugin from '@fullcalendar/timegrid';
import '../styles/calender.css';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [currentDateRange, setCurrentDateRange] = useState({});
  const calendarRef = useRef(null);

  useEffect(() => {
    // Sample data - replace with your API call
    const sampleAppointments = [
      {
        "_id": "68e3f78ebfe141c29cdf3500",
        "userId": "680174698d70183301045338",
        "adminId": "68a8a2dc13339119a22d6613",
        "clientName": "Albert Lobo",
        "date": "18-10-2025",
        "categoryId": "68a8ae8a0afd4681ab808344",
        "services": null,
        "stylist": "68dffbd8a370c3a907918a9a",
        "timeSlot": "11:00 AM",
        "price": 190,
        "status": "Pending",
        "createdAt": "2025-10-06T17:08:30.506Z",
        "updatedAt": "2025-10-06T17:08:30.506Z",
        "__v": 0
      },
      {
        "_id": "68e3f7b5bfe141c29cdf350a",
        "userId": "680174698d70183301045338",
        "adminId": "68a8a2dc13339119a22d6613",
        "clientName": "John Doe",
        "date": "10-10-2025",
        "categoryId": "68a8ae8a0afd4681ab808345",
        "services": "Haircut & Shave",
        "stylist": "68dffbd8a370c3a907918a9a",
        "timeSlot": "10:00 AM",
        "price": 190,
        "status": "Confirmed",
        "createdAt": "2025-10-06T17:09:09.050Z",
        "updatedAt": "2025-10-06T17:09:09.050Z",
        "__v": 0
      },
      {
        "_id": "68e3f7b5bfe141c29cdf350b",
        "userId": "680174698d70183301045338",
        "adminId": "68a8a2dc13339119a22d6613",
        "clientName": "Albert Lobo",
        "date": "15-10-2025",
        "categoryId": "68a8ae8a0afd4681ab808344",
        "services": "Haircut",
        "stylist": "68dffbd8a370c3a907918a9a",
        "timeSlot": "02:00 PM",
        "price": 150,
        "status": "Confirmed",
        "createdAt": "2025-10-06T17:09:09.050Z",
        "updatedAt": "2025-10-06T17:09:09.050Z",
        "__v": 0
      },
      {
        "_id": "68e3f7b5bfe141c29cdf350c",
        "userId": "680174698d70183301045338",
        "adminId": "68a8a2dc13339119a22d6613",
        "clientName": "Albert Lobo",
        "date": "16-10-2025",
        "categoryId": "68a8ae8a0afd4681ab808344",
        "services": "Beard Styling",
        "stylist": "68dffbd8a370c3a907918a9a",
        "timeSlot": "03:00 PM",
        "price": 200,
        "status": "Confirmed",
        "createdAt": "2025-10-06T17:09:09.050Z",
        "updatedAt": "2025-10-06T17:09:09.050Z",
        "__v": 0
      }
    ];

    const formattedEvents = formatAppointmentsForCalendar(sampleAppointments);
    setEvents(formattedEvents);
  }, []);

  const formatAppointmentsForCalendar = (appointments) => {
    return appointments.map(appointment => {
      const [day, month, year] = appointment.date.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      
      // Time conversion for week view
      const timeString = appointment.timeSlot;
      let hours = parseInt(timeString.split(':')[0]);
      const minutes = timeString.split(':')[1]?.split(' ')[0] || '00';
      const period = timeString.includes('PM') ? 'PM' : 'AM';
      
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      const startTime = `${formattedDate}T${hours.toString().padStart(2, '0')}:${minutes}:00`;
      const endHours = (hours + 1) % 24;
      const endTime = `${formattedDate}T${endHours.toString().padStart(2, '0')}:${minutes}:00`;
      
      return {
        id: appointment._id,
        title: `${appointment.clientName} - ${appointment.timeSlot}`,
        start: startTime,
        end: endTime,
        resourceId: appointment.stylist,
        extendedProps: {
          clientName: appointment.clientName,
          category: getCategoryName(appointment.categoryId),
          timeSlot: appointment.timeSlot,
          price: appointment.price,
          status: appointment.status,
          services: appointment.services,
          originalDate: appointment.date
        },
        color: getEventColor(appointment.status)
      };
    });
  };

  // Category IDs to names mapping
  const getCategoryName = (categoryId) => {
    const categories = {
      "68a8ae8a0afd4681ab808344": "Haircut",
      "68a8ae8a0afd4681ab808345": "Beard Styling",
      "68a8ae8a0afd4681ab808346": "Hair Color"
    };
    return categories[categoryId] || "Service";
  };

  const getEventColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffc107';
      case 'Confirmed': return '#28a745';
      case 'Completed': return '#17a2b8';
      case 'Cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  // Custom Event Content Renderer
  const renderEventContent = (eventInfo) => {
    const extendedProps = eventInfo.event.extendedProps;
    
    return {
      html: `
        <div class="custom-event" data-client="${extendedProps.clientName}">
          <div class="event-client">${extendedProps.clientName}</div>
          <div class="event-details">
            <span class="event-category">${extendedProps.category}</span>
            <span class="event-time">${extendedProps.timeSlot}</span>
          </div>
        </div>
      `
    };
  };

  const handleEventClick = (clickInfo) => {
    // Check if it's a valid event with extendedProps
    if (!clickInfo.event || !clickInfo.event.extendedProps) {
      console.log('No event found or undefined event');
      return;
    }

    const event = clickInfo.event;
    const extendedProps = event.extendedProps;
    
    // Pehle client set karo aur week view switch karo
    setSelectedClient(extendedProps.clientName);
    
    // Calendar ko week view mein switch karo (event date par)
    const calendarApi = clickInfo.view.calendar;
    calendarApi.changeView('timeGridWeek', event.start);
  };

  // Jab view change hota hai ya dates set hoti hain
  const handleDatesSet = (dateInfo) => {
    setCurrentView(dateInfo.view.type);
    setCurrentDateRange({
      start: dateInfo.start,
      end: dateInfo.end
    });

    // Week view mein empty rows/cells hide karo
    if (dateInfo.view.type === 'timeGridWeek') {
      setTimeout(() => {
        hideEmptyTimeSlots();
      }, 100);
    }
  };

  // Empty time slots hide karne ka function
  const hideEmptyTimeSlots = () => {
    const timeSlots = document.querySelectorAll('.fc-timegrid-slots tr');
    timeSlots.forEach(slot => {
      const slotTime = slot.querySelector('.fc-timegrid-slot-label')?.textContent;
      const slotCells = slot.querySelectorAll('.fc-timegrid-slot');
      
      // Check if this time slot has any events
      const hasEvents = Array.from(slotCells).some(cell => {
        const cellRect = cell.getBoundingClientRect();
        const events = document.querySelectorAll('.fc-timegrid-event');
        
        return Array.from(events).some(event => {
          const eventRect = event.getBoundingClientRect();
          return eventRect.top === cellRect.top && eventRect.left === cellRect.left;
        });
      });

      // Agar koi event nahi hai, toh slot ko hide karo
      if (!hasEvents) {
        slot.style.display = 'none';
      }
    });
  };

  // Filter events based on selected client and current date range
  const getFilteredEvents = () => {
    if (selectedClient && currentView === 'timeGridWeek') {
      // Sirf selected client ke events dikhao
      const filteredEvents = events.filter(event => 
        event.extendedProps.clientName === selectedClient
      );
      console.log('Filtered Events for', selectedClient, ':', filteredEvents);
      return filteredEvents;
    }
    return events; // All events for month view
  };

  // Back to month view button
  const handleBackToMonthView = () => {
    setSelectedClient(null);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView('dayGridMonth');
    }
  };

  return (
    <div className='calendar-container'>
      {/* Header showing selected client in week view */}
      {selectedClient && currentView === 'timeGridWeek' && (
        <div className="client-week-header">
          <h3>📅 Weekly Schedule for: {selectedClient}</h3>
          <button onClick={handleBackToMonthView} className="back-button">
            ← Back to Month View
          </button>
        </div>
      )}
      
      <FullCalendar
        ref={calendarRef}
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={false} // Disable editing for now
        selectable={false} // Disable selection for empty slots
        selectMirror={true}
        resources={[
          { id: '68dffbd8a370c3a907918a9a', title: 'Stylist 1', eventColor: 'pink' }
        ]}
        events={getFilteredEvents()}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        datesSet={handleDatesSet}
        height={600}
        schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
        allDaySlot={false} // All day slot hide karo
        slotMinTime="08:00:00" // Start time
        slotMaxTime="20:00:00" // End time
        slotDuration="01:00:00" // 1 hour slots
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }}
      />
    </div>
  );
}