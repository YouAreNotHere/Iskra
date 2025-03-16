import { useEffect, useState } from 'react';
import "./YandexMap.scss"

const YandexMap = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadScript = () => {
            if (typeof window.ymaps !== 'undefined') {
                setIsLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ВАШ_КЛЮЧ&lang=ru_RU';
            document.head.appendChild(script);

            script.onload = () => setIsLoaded(true);
        };

        loadScript();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        window.ymaps.ready(() => {
            const map = new window.ymaps.Map('map', {
                center: [56.840429, 60.616204],
                zoom: 16,
            });

            const placemark = new window.ymaps.Placemark(
                [56.840429, 60.616204],
                { hintContent: 'Наш офис' }
            );

            map.geoObjects.add(placemark);
        });
    }, [isLoaded]);

    return <div id="map" className="maps" style={{ width: '100%', height: '400px' }} />;
};

export default YandexMap;