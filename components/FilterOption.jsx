'use client'

import React, { useState, useEffect } from "react"
const getTopics = async () => {
    const apiUrl = process.env.API_URL;

    try {
        const res = await fetch(`/api/pupils`, {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Mavzular yuklanmadi');
        }

        return res.json();
    } catch (error) {
        console.log('Mavzular yuklanishda xatolik: ', error);
        return { mavzula: [] };
    }
};

export default function FilterOption({ shaxsiy, setShaxsiy, setSetShaxs, setSetIsimi }) {
    const [mavzula, setMavzula] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedName, setOptionName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topics = await getTopics();
                setMavzula(topics.mavzula);
            } catch (error) {
                console.log('Mavzular yuklanishda xatolik: ', error);
            }
        };

        fetchData();
    }, []);

    const handleOptionChange = (e) => {
        const selectedGrade = e.target.value;
        setSelectedOption(selectedGrade);
        setShaxsiy(selectedGrade);
    };

    const yangiIsm = (e) => {
        const selectedNamesi = e.target.value;
        setOptionName(selectedNamesi);
        setSetShaxs(selectedNamesi);
    };

    const sinflar = Array.from({ length: 11 }, (_, index) => index + 1);

    return (
        <div>
            <select className="px-2 py-3 cursor-pointer w-full" value={selectedOption} onChange={handleOptionChange}>
                <option>Bu yerdan tanlang</option>
                {sinflar.map((sinf) => (
                    <option key={sinf} value={sinf}>
                        {sinf}
                    </option>
                ))}
            </select>
            <div className="gap-4">
                <label className="text-[18px] poppins font-bold" htmlFor="">
                    Familiya, Ismi hamda Otasining ismi
                </label>
                <select className="w-full p-3" value={selectedName} onChange={yangiIsm}>
                    <option>Tanlang</option>
                    {mavzula
                        .filter((mavzu) => mavzu.sinf === parseInt(selectedOption))
                        .map((mavzu, index) => (
                            <option className="" key={index} value={mavzu.shaxs}>
                                {mavzu.shaxs} <b>{mavzu.sinf}-sinf</b>
                            </option>
                        ))}
                </select>
            </div>
        </div>
    );
}