'use client';

import CompanyCard from './CompanyCard';
import { useState } from 'react';
import { FaSpinner } from "react-icons/fa";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Table({ data, skip }) {

    const [currentSkip, setCurrentSkip] = useState(skip);
    const [currentRows, setCurrentRows] = useState(data);
    const [isLoadingNext, setIsLoadingNext] = useState(false);
    const [isLoadingPrev, setIsLoadingPrev] = useState(false);

    const handlePrevClick = async () => {
        setIsLoadingPrev(true);
        if (currentSkip > 0) {
            const newSkip = currentSkip - 10;
            const response = await fetch(`/api/skip?number=${newSkip}`)
            const newRows = await response.json();
            setCurrentSkip(newSkip);
            setCurrentRows(newRows);
            setIsLoadingPrev(false);
        }
    };

    const handleNextClick = async () => {
        setIsLoadingNext(true);
        const newSkip = currentSkip + 10;
        const response = await fetch(`/api/skip?number=${newSkip}`);
        const newRows = await response.json();
        const rows = newRows.rows;
        setCurrentSkip(newSkip);
        setCurrentRows(rows);
        setIsLoadingNext(false);
    };

    return (
        <>
            <div className="flex flex-col text-xl m-20">
                <div className="flex flex-row justify-between">
                    {isLoadingPrev ? (
                        <button className="animate-spin text-gray-500"><FaSpinner /></button>
                    ) : (
                        <button className="text-gray-500" onClick={handlePrevClick}><FaArrowLeft /></button>

                    )}
                    {isLoadingNext ? (
                        <button className="animate-spin text-gray-500"><FaSpinner /></button>

                    ) : (
                        <button className="text-gray-500" onClick={handleNextClick}><FaArrowRight /></button>
                    )}
                </div>

                <ul role="list" className="grid grid-cols-1 gap-6">
                    {currentRows.map((row) => (
                        <li className="p-6 w-full" key={row.number}>
                            <CompanyCard key={row} row={row} />
                        </li>
                    ))}
                </ul>

                <div className="flex flex-row justify-between">
                    {isLoadingPrev ? (
                        <button className="animate-spin text-gray-500"><FaSpinner /></button>
                    ) : (
                        <button className="text-gray-500" onClick={handlePrevClick}><FaArrowLeft /></button>

                    )}
                    {isLoadingNext ? (
                        <button className="animate-spin text-gray-500"><FaSpinner /></button>

                    ) : (
                        <button className="text-gray-500" onClick={handleNextClick}><FaArrowRight /></button>
                    )}
                </div>

            </div>
        </>
    )
}