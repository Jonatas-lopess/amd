import { useEffect, useState } from "react"

const SECOND = 1000;
const MINUTE = SECOND * 60;

const useTimer = () => {
    const [timespan, setTimespan] = useState(sessionStorage.getItem('timer') ? Number(sessionStorage.getItem('timer')) : 0);

    useEffect(() => {
        sessionStorage.setItem('timer', timespan);
        setTimeout(() => setTimespan(prev => prev + SECOND), SECOND);
    }, [timespan]);

    return {
        minutes: Math.floor((timespan / MINUTE) % 60),
        seconds: Math.floor((timespan / SECOND) % 60)
    }
}

export default useTimer;