"use client";

import React, { useState, useEffect } from "react";

export default function CustomInput() {
    const [inputValue, setInputValue] = useState("");
    const [currentChar, setCurrentChar] = useState("A");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [yesCountdown, setYesCountdown] = useState(null as number | null);
    const [selectorPosition, setSelectorPosition] = useState({ top: 200, left: 200 });
    const [isBlockingPopupVisible, setIsBlockingPopupVisible] = useState(false);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

    const incrementChar = () => {
        const newIndex = (alphabet.indexOf(currentChar) + 1) % alphabet.length;
        setCurrentChar(alphabet[newIndex]);
    };

    const decrementChar = () => {
        const newIndex = (alphabet.indexOf(currentChar) - 1 + alphabet.length) % alphabet.length;
        setCurrentChar(alphabet[newIndex]);
    };

    const addCharToInput = () => {
        setInputValue(currentChar + inputValue);
        showBlockingPopup();
        moveSelectorRandomly();
    };

    const moveSelectorRandomly = () => {
        const randomTop = Math.floor(Math.random() * 500);
        const randomLeft = Math.floor(Math.random() * 500);
        setSelectorPosition({ top: randomTop, left: randomLeft });
    };

    const showBlockingPopup = () => {
        setIsBlockingPopupVisible(true);
        setTimeout(() => {
            setIsBlockingPopupVisible(false);
        }, 1500); // 1.5 secondes
    };

    const removeLastChar = () => {
        setCountdown(3);
        setIsPopupVisible(true);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isPopupVisible && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer );
    }, [countdown, isPopupVisible]);

    const handleYesClick = () => {
        setYesCountdown(3); // Démarrer le décompte pour le bouton "Oui"
    };

    useEffect(() => {
        let yesTimer: NodeJS.Timeout;
        if (yesCountdown !== null && yesCountdown > 0) {
            yesTimer = setTimeout(() => setYesCountdown(yesCountdown - 1), 1000);
        } else if (yesCountdown === 0) {
            setYesCountdown(null); // Arrête le décompte
            setIsPopupVisible(false); // Ferme la pop-up
        }
        return () => clearTimeout(yesTimer);
    }, [yesCountdown]);

    const confirmDelete = () => {
        setInputValue(inputValue.slice(1)); // Supprime le premier caractère
        setIsPopupVisible(false);
    };

    const cancelDeleteCompletely = () => {
        setIsPopupVisible(false);
    };

    const validateInput = () => {
        alert(`Vous avez validé : ${inputValue}`);
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
            {/* Blocking Popup */}
            {isBlockingPopupVisible && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-md text-xl font-bold text-center text-black">
                        Caractère ajouté avec succès
                    </div>
                </div>
            )}

            {/* Input Display */}
            <div className="flex items-center justify-center border p-2 rounded w-64 text-lg bg-white shadow-md mb-8 text-black">
                {inputValue || "Commencez à écrire..."}
            </div>

            {/* Character Selector */}
            <div
                className="absolute flex flex-col items-center bg-gray-100 p-4 rounded shadow-md"
                style={{ top: selectorPosition.top, left: selectorPosition.left }}
            >
                <button
                    onClick={incrementChar}
                    className="text-2xl font-bold text-black"
                >
                    ▲
                </button>
                <div
                    className="text-2xl font-semibold my-2"
                    style={{ color: 'black' }}
                >
                    {currentChar}
                </div>
                <button
                    onClick={decrementChar}
                    className="text-2xl font-bold"
                    style={{ color: 'black' }}
                >
                    ▼
                </button>
                <button
                    onClick={addCharToInput}
                    className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
                >
                    Ajouter
                </button>
            </div>

            {/* Delete and Validate Buttons */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={removeLastChar}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Supprimer le dernier caractère
                </button>
                <button
                    onClick={validateInput}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Valider
                </button>
            </div>

            {/* Popup for delete confirmation */}
            {isPopupVisible && (
                <div className="absolute bg-white border p-4 rounded shadow-md flex flex-col items-center gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <p className="text-lg">
                        Êtes-vous sûr.e de ne pas vouloir supprimer le caractère ?
                    </p>

                    {yesCountdown !== null ? (
                        <p className="text-xl font-bold text-red-500">
                            Patientez... {yesCountdown}s
                        </p>
                    ) : (
                        <div className="flex flex-col gap-2 w-full">
                            {/* Oui bouton vert */}
                            <button
                                onClick={handleYesClick}
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
                            >
                                Oui
                            </button>

                            {/* Non je ne veux pas ne pas faire ça bouton gris */}
                            <button
                                onClick={cancelDeleteCompletely}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 w-full"
                            >
                                Non je ne veux pas ne pas faire ça
                            </button>

                            {/* Non sans cadre */}
                            <button
                                onClick={confirmDelete}
                                className="text-red-500 py-2 w-full hover:underline"
                            >
                                Non
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
