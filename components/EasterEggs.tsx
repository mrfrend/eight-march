'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { EASTER_EGG_CONSOLE_MESSAGE, KONAMI_MESSAGE } from '@/lib/data';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

export function EasterEggs() {
    useEffect(() => {
        // Console message
        console.log(
            EASTER_EGG_CONSOLE_MESSAGE,
            'color: #e8839f; font-size: 18px; font-weight: bold;',
            'color: #1a2b48;'
        );

        // Konami Code
        let konamiProgress = 0;
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === KONAMI_CODE[konamiProgress]) {
                konamiProgress++;
                if (konamiProgress === KONAMI_CODE.length) {
                    toast.success(KONAMI_MESSAGE, { duration: 5000 });
                    document.body.style.backgroundImage =
                        'repeating-linear-gradient(45deg, #fff1f3, #fff1f3 10px, #fce4ec 10px, #fce4ec 20px)';
                    setTimeout(() => {
                        document.body.style.backgroundImage = '';
                    }, 5000);
                    konamiProgress = 0;
                }
            } else {
                konamiProgress = 0;
            }
        };
        document.addEventListener('keydown', handleKeydown);

        // Triple click easter egg
        let clickCount = 0;
        let clickTimer: ReturnType<typeof setTimeout>;
        const handleClick = () => {
            clickCount++;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clickCount = 0; }, 500);
            if (clickCount >= 3) {
                clickCount = 0;
            }
        };
        document.addEventListener('click', handleClick);

        // 100 clicks total easter egg
        let totalClicks = 0;
        const handle100Click = () => {
            totalClicks++;
            if (totalClicks === 100) {
                toast('🎯 100 кликов! Ты настоящий агент-марафонец!', {
                    duration: 5000,
                    icon: '🏆',
                });
            }
        };
        document.addEventListener('click', handle100Click);

        // DeviceMotion easter egg (for mobile)
        const handleMotion = (e: DeviceMotionEvent) => {
            const acc = e.accelerationIncludingGravity;
            if (acc && Math.abs(acc.x || 0) > 15) {
                toast.info('📱 Телефон встряхнут! С 8 Марта! 🌸', { duration: 2000 });
            }
        };
        if (typeof DeviceMotionEvent !== 'undefined') {
            window.addEventListener('devicemotion', handleMotion);
        }

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('click', handle100Click);
            window.removeEventListener('devicemotion', handleMotion);
        };
    }, []);

    return null;
}
