import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { createClient } from '../client/client';
import {rssFeedsApiV1RssGetOptions} from '../client/@tanstack/react-query.gen';
import type { Rss, Item as RssItem } from "../client";
import { toast } from "react-toastify";

const client = createClient();

const RSSItem = ({item}: {item: RssItem}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <h3 className="subtitle">{item.title}</h3>
            {isOpen && item.description && <div className="content" dangerouslySetInnerHTML={{__html: item.description}}></div>}
            <hr></hr>
        </div>
    )
}

export default function RSSFeed() {
    const [feeds, setFeeds] = useState<Rss[] | undefined>(undefined);
    const queryParams = new URLSearchParams(window.location.search);
    const activeTag = queryParams.get("tag") || "All";

    const {data, error} = useQuery({
        ...rssFeedsApiV1RssGetOptions({
            query: {
                tag: activeTag
            },
            client: client
        }),
        retry: true
    });

    useEffect(() => {
        if(error) {
            toast.error("Failed to get RSS feed Tags");
        } else if(data) {
            setFeeds(data);
        }
    }, [data, error]);

    return (
        <div>
        {feeds !== undefined && feeds.map((feed, index) => {
            return (
                <div key={index}>
                    <h2 className="subtitle">{feed.channel.title}</h2>
                    {feed.channel.item.map((item, index) => <RSSItem item={item} key={index} />)}
                </div>
            )
        })}
        </div>
    )
}