import React, {useRef, useEffect} from "react";
import {Box} from '@material-ui/core';
import '@tensorflow/tfjs';

import useVideoStream from './hooks/useVideoStream';
import useUploadModel from './hooks/useUploadModel';
import buildObjectRectangle from './utils/buildObjectRectangle';

import './App.css';

const SCALE = 1.2;
const WIDTH = SCALE * 640;
const HEIGHT = SCALE * 480;

export default () => {
    const {isLoading, model} = useUploadModel();
    const {videoRef} = useVideoStream();


    const canvasRef = useRef<HTMLCanvasElement>(null);

    function detectFrame() {
        if (model && canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            model.detect(videoRef.current)
                .then(detectedObjects => {
                    buildObjectRectangle(canvas, detectedObjects, SCALE);
                    window.requestAnimationFrame(detectFrame);
                });
        }
    }

    useEffect(() => {
        if (model) {
            detectFrame();
        }
    }, [model]);

    return (
        <Box className="Container">
            {isLoading && <div style={{textAlign: 'center'}}>Uploading model....</div>}
            <Box style={{
                width: WIDTH,
                height: HEIGHT,
                margin: '0 auto',
                position: 'relative'
            }}>
                <video ref={videoRef} width={WIDTH} height={HEIGHT} autoPlay playsInline muted/>
                <canvas
                    ref={canvasRef}
                    width={WIDTH}
                    height={HEIGHT}
                    className="Container__video"
                />
            </Box>
        </Box>
    );
}