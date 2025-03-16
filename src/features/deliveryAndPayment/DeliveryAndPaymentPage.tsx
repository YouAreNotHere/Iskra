import { useEffect, useState } from 'react';
import {useRequest} from "../../shared/hooks/useRequest.ts";
import "./DeliveryAndPayment.scss"
import YandexMap from "../../shared/maps/YandexMap.tsx";

const DeliveryAndPaymentPage = () => {
    const [content, setContent] = useState('');
    const {data, makeRequest, errorMessage} = useRequest({method:"POST",
        body: {action: 'get_page_by_slug', slug: "/доставка-и-оплата"}});
    // const myMapKey = "294fc379-79be-474d-8180-35617fc680c9"

    useEffect(() => {
        makeRequest();
    }, []);

    useEffect(() => {
        if (data){
            setContent(data.data.content)
        }
    }, [data]);

    if (!content) return <p>Загрузка...</p>
    if (errorMessage) return <p>{errorMessage}</p>

    return (
        <div className="page-container">
            <h1>Доставка и оплата</h1>
            <div className="deliveryAndPayment" dangerouslySetInnerHTML={{__html: content}}/>
            <YandexMap/>
        </div>
    );
};

export default DeliveryAndPaymentPage;