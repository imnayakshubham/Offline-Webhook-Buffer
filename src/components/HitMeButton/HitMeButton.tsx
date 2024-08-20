import axios from "axios";
import { useOnlineStatus } from "../../hoots/useOnlineStatus";
import { useCallback, useEffect } from "react";


type PayloadType = {
    timestamp: string;
    message: string;
}


export const HitMeButton = () => {
    const isOnline = useOnlineStatus();


    const sendBufferedRequests = useCallback(async (bufferedRequests: PayloadType[]) => {
        const remainingRequests = [];
        for (const request of bufferedRequests) {
            try {
                await axios.post(import.meta.env.VITE_APP_WEBHOOK_URL, request);
                console.log('Buffered request sent:', request);
            } catch (error) {
                console.error('Failed to send buffered request:', request, error);
                remainingRequests.push(request);
            }
        }
        console.log({ remainingRequests })
        localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY, JSON.stringify(remainingRequests));
    }, [])


    useEffect(() => {
        const bufferedRequestString = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY);
        const bufferedRequest = bufferedRequestString ? JSON.parse(bufferedRequestString) : [];
        if (isOnline && bufferedRequest.length > 0) {
            sendBufferedRequests(bufferedRequest);
        }
    }, [isOnline, sendBufferedRequests]);


    const sendRequest = async (data: PayloadType) => {
        try {
            await axios.post(import.meta.env.VITE_APP_WEBHOOK_URL, data);
            console.log('Request sent:', data);
        } catch (error) {
            console.error('Failed to send request:', error);
            bufferRequest(data);
        }
    };

    const bufferRequest = (data: PayloadType) => {
        const bufferedRequestString = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY);
        const bufferedRequest = bufferedRequestString ? JSON.parse(bufferedRequestString) : [];
        const updatedRequests = [...bufferedRequest, data];
        localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY, JSON.stringify(updatedRequests));
    };


    const handleHitMe = () => {
        const payload = {
            timestamp: new Date().toISOString(),
            message: "Request made at this time"
        };

        if (isOnline) {
            sendRequest(payload);
        } else {
            bufferRequest(payload);
        }
    };

    return (
        <button onClick={() => handleHitMe()}>Hit Me</button>
    )
}
