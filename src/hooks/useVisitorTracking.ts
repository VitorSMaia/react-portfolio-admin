
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { visitorService } from '@/services/visitorService';
import type { VisitorInfo } from '@/types/visitor';

const SESSION_KEY = 'dv_portfolio_session_id';

export function useVisitorTracking() {
    const trackedRef = useRef(false);

    useEffect(() => {
        // Prevent double tracking in StrictMode or during re-renders
        if (trackedRef.current) return;
        trackedRef.current = true;

        async function trackVisitor() {
            try {
                // 1. Get or create session ID
                let sessionId = localStorage.getItem(SESSION_KEY);
                if (!sessionId) {
                    sessionId = uuidv4();
                    localStorage.setItem(SESSION_KEY, sessionId);
                }

                // 2. Fetch visitor info from ipinfo.io (Native IPv6 support, highly reliable)
                const response = await fetch('https://ipinfo.io/json');
                if (!response.ok) throw new Error('Failed to fetch visitor data');

                const info: VisitorInfo = await response.json();

                // 3. Parse location string (format: "lat,lng")
                const [lat, lng] = (info.loc || "0,0").split(',').map(Number);

                // 4. Prepare data package
                const visitorData = {
                    ip_address: info.ip,
                    country: info.country,
                    city: info.city,
                    latitude: lat,
                    longitude: lng,
                    session_id: sessionId,
                    user_agent: navigator.userAgent,
                    raw_data: info
                };

                // 4. Transmit to database
                await visitorService.logVisitor(visitorData);
                console.log('Visitor session logged:', sessionId);

            } catch (error) {
                console.error('Visitor tracking protocol failed:', error);
            }
        }

        trackVisitor();
    }, []);
}
