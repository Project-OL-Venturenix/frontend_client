import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const storedTime = sessionStorage.getItem('countdownTime');
    const initialTime = storedTime ? JSON.parse(storedTime) : { hours: 1, minutes: 0, seconds: 0 };

    const [time, setTime] = useState(initialTime);

    const tick = () => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            reset();
        } else if (time.minutes === 0 && time.seconds === 0) {
            setTime({
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59,
            });
        } else if (time.seconds === 0) {
            setTime({
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59,
            });
        } else {
            setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1,
            });
        }
    };

    const reset = () => {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        sessionStorage.removeItem('countdownTime');
        clearInterval(interval);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            tick();
            sessionStorage.setItem('countdownTime', JSON.stringify(time));
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <div>
            <div style={{
                fontSize: '20px'
            }}>
                <span>Countdown :</span>
                <span>{String(time.hours).padStart(2, '0')}:</span>
                <span>{String(time.minutes).padStart(2, '0')}:</span>
                <span>{String(time.seconds).padStart(2, '0')}</span>
            </div>
        </div>
    );
};

export default CountdownTimer;