import { useEffect, useState } from 'react';
import {useRequest} from "../../shared/hooks/useRequest.ts";
import "./AboutPage.scss"

const AboutPage = () => {
    const [content, setContent] = useState('');
    const {data, makeRequest, errorMessage} = useRequest({method:"POST",
        body: {action: 'get_page_by_slug', slug: "/о-нас"}});

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
        <div className="about-container">
            <h1>О Нас</h1>
            <div className="about" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default AboutPage;