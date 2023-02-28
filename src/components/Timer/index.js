import { useEffect, useState } from "react"

const SECOND = 1000;
const MINUTE = SECOND * 60;

const useTimer = () => {
    const [timespan, setTimespan] = useState(localStorage.getItem('timer') ? Number(localStorage.getItem('timer')) : 0);

    useEffect(() => {
        localStorage.setItem('timer', timespan);
        let timeout = setTimeout(() => setTimespan(prev => prev + SECOND), SECOND);

        return () => clearTimeout(timeout);
    }, [timespan]);

    return {
        minutes: Math.floor((timespan / MINUTE) % 60),
        seconds: Math.floor((timespan / SECOND) % 60)
    }
}

export default useTimer;