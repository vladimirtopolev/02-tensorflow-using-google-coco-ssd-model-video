import {useEffect, useRef} from 'react';

export default () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function init() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && videoRef.current) {
                try {
                    videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({video: true});
                } catch (e) {
                    console.error(e);
                }
            }
        }

        init();
    }, []);

    return {videoRef};
}