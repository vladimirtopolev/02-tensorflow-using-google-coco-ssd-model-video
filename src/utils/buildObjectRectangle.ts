import {DetectedObject} from '@tensorflow-models/coco-ssd';
import classData from './classData';

export default (canvas: HTMLCanvasElement, predictions: DetectedObject[], scale: number = 1) => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Build the rectangle styling
    ctx.lineWidth = 2;
    ctx.textBaseline = 'bottom';
    ctx.font = '14px sans-serif';

    predictions.forEach(guess => { // Draw the rectangle around each object prediction
        const guessText = `${guess.class}`;

        ctx.strokeStyle = classData[guessText]; // give each guess.class's box a unique color

        const textWidth = ctx.measureText(guessText).width;
        const textHeight = parseInt(ctx.font, 10);
        ctx.strokeRect(guess.bbox[0]*scale, guess.bbox[1]*scale, guess.bbox[2]*scale, guess.bbox[3]*scale);
        ctx.fillStyle = 'white';
        ctx.fillRect(
            guess.bbox[0] - ctx.lineWidth / 2, // place the label on the top left of the box
            guess.bbox[1],
            textWidth + ctx.lineWidth,
            -textHeight);
        ctx.fillStyle = '#fc0303'; // color the label text red, always
        ctx.fillText(guessText, guess.bbox[0], guess.bbox[1]);
    });
}