import { useEffect, useState} from 'react';
import { useRequest } from "../../shared/hooks/useRequest.ts";
import "./News.scss";

const News = () => {
    const [newsItems, setNewsItems] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { data, makeRequest, isLoading,errorMessage } = useRequest({
        method: "POST",
        body: {
            action: 'get_paginated_news',
            slug: "/новости",
            page: page.toString(),
            per_page: "2",
        }
    });

    useEffect(() => {
        makeRequest();
    }, [page]);

    useEffect(() => {
        let isMounted = true;

        if (data && isMounted) {
            setNewsItems(prev => {
                const newItems = data.data.news.filter((item: string) => !prev.includes(item));
                return [...prev, ...newItems];
            });
            const totalPages = Math.ceil(data.data.total / data.data.per_page);
            setHasMore(data.data.page < totalPages);
        }

        return () => { isMounted = false };
    }, [data]);

    if (errorMessage) return <p>{errorMessage}</p>;

    console.log(newsItems);

    return (
        <div className="news-container">
            <h1>Новости</h1>
            <div className="news">
                {newsItems.map((item) => (
                    <div
                        key={item}
                        className="news-item"
                        dangerouslySetInnerHTML={{ __html: item }}
                    />
                ))}
            </div>
            {isLoading && (<p>Новости загружаются...</p>)}
            {hasMore && (
                <button
                    onClick={() => setPage(p => p + 1)}
                    className={!isLoading && newsItems ? "news__button" : "news__button--hidden"}
                    disabled={isLoading}
                >
                    Показать ещё
                </button>
            )}
        </div>
    );
};

export default News;