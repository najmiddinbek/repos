'use client'


import React, { useEffect, useState } from 'react';

const getTopics = async () => {
    const apiUrl = process.env.API_URL;
    const filterDate = new Date("2023-11-04T24:00:00").getTime();
    try {
        const res = await fetch(`/api/topics`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Mavzularni yuklashda xatolik yuz berdi');
        }

        const { topiclar } = await res.json();
        const filteredTopics = topiclar.filter(topic => {
            const createdAt = new Date(topic.createdAt).getTime();
            return createdAt > filterDate;
        });

        return filteredTopics;
    } catch (error) {
        console.log('Mavzular yuklanishda xatolik: ', error.message);
        return [];
    }
};

export default function Count() {
    const [topicCount, setTopicCount] = useState();
    const [latestTopicId, setLatestTopicId] = useState('');
    const [filteredTopics, setFilteredTopics] = useState([]);
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topics = await getTopics();
                setFilteredTopics(topics);
                setTopicCount(topics.length);

                if (topics.length > 0) {
                    const latestTopicId = topics[topics.length - 1]._id;
                    setLatestTopicId(latestTopicId);
                }
            } catch (error) {
                console.log('Mavzular olishda xatolik: ', error.message);
            }
        };

        fetchTopics();
    }, []);

    return (
        <>
            {filteredTopics.length > 0 && (
                <>
                    <div className="absolute right-[50%] bg-red-600 text-[12px] text-white rounded-full px-1.5">
                        {topicCount}
                    </div>
                </>
            )}
        </>
    );
}