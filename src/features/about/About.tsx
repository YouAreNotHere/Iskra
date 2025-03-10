import React, { useEffect, useState } from 'react';

const AboutPage = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        // Получаем контент из скрытого div#page-content
        const contentDiv = document.getElementById('page-content');
        if (contentDiv) {
            setContent(contentDiv.innerHTML);
        }
    }, []);

    return (
        <div className="about-container">
            <h1>О Нас</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} /> {/* Вставляем HTML */}
        </div>
    );
};

export default AboutPage;