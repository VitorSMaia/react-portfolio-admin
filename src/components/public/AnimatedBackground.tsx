import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        const particles: { x: number; y: number; speed: number; opacity: number }[] = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: 0.5 + Math.random() * 1.5,
                opacity: 0.1 + Math.random() * 0.4
            })
        }

        const draw = () => {
            ctx.fillStyle = '#020617'; // Dark BG
            ctx.fillRect(0, 0, width, height);

            // Grid effect
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.05)';
            ctx.lineWidth = 1;

            // Vertical lines
            const gridSize = 50;
            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }

            // Horizontal lines
            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Floating Particles
            particles.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(14, 165, 233, ${p.opacity})`;
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();

                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }
            });

            requestAnimationFrame(draw);
        };

        const animationId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
}
