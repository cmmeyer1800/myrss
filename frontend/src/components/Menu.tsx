import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '../client/client';
import {rssTagsApiV1RssTagsGetOptions} from '../client/@tanstack/react-query.gen';
import { toast } from 'react-toastify';

const client = createClient();

export default function Menu() {
    const [tags, setTags] = useState<string[]>(["All"]);
    const queryParams = new URLSearchParams(window.location.search);
    const activeTag = queryParams.get("tag") || "All";

    const {data, error} = useQuery({
        ...rssTagsApiV1RssTagsGetOptions({
            client: client
        }),
        retry: false
    });

    useEffect(() => {
        if(error) {
            toast.error("Failed to get RSS feed Tags");
        } else if(data) {
            setTags(["All", ...data]);
        }
    }, [data, error]);

    return (
        <aside className="menu">
            <p className="menu-label">Tags</p>
            <ul className="menu-list">
                {tags.map((tag, index) => <li key={index}>
                    <a href={`/?tag=${tag}`} className={tag === activeTag ? "is-active" : ""}>{tag}</a>
                </li>)}
            </ul>
        </aside>
    )
}
