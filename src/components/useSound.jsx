import { useRef, useEffect } from 'react';

export const useSound = (audioSource) => {
    const  soundRef = useRef();

    useEffect(() => {
        soundRef.current = new Audio(audioSource);
    }, []);

    const playSound = () => {
        soundRef.current.play();
    };

    const stopSound = () => {
        soundRef.current.pause();
        soundRef.current.currentTime = 0;
    };

    return { playSound, stopSound };
}