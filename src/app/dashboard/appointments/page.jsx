import React from 'react';
import MyCalender from '@/components/MyCalender';

const Appointment = () => {
    return (
        <div style={{ margin: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Appointments</h1>
            <MyCalender />
        </div>
    );
};

export default Appointment;
