import { useEffect, useState } from "react"

const SECOND = 1000;
const MINUTE = SECOND * 60;

const useTimer = () => {
    const [timespan, setTimespan] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTimespan(prev => prev + SECOND), SECOND);

        return () => clearInterval(interval);
    }, [timespan]);

    return {
        minutes: Math.floor((timespan / MINUTE) % 60),
        seconds: Math.floor((timespan / SECOND) % 60)
    }
}

export default useTimer;