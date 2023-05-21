import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Card from './Card';

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const Pile = () => {
    const deckId = useRef(null);
    const cardsRemaining = useRef(null);

    const [topCard, setTopCard] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(function createNewDeck() {
        async function fetchNewDeckId() {
            const newDeckURL = "new/shuffle?deck_count=1";
            const deckResult = await axios.get(`${BASE_URL}/${newDeckURL}`);

            deckId.current = deckResult.data.deck_id;
            cardsRemaining.current = deckResult.data.remaining;
        }
        fetchNewDeckId();
    }, []);

    useEffect(function drawCards() {
        if (isDrawing) {
            let timerId = setInterval(() => fetchNextCard(), 1000);
            return () => clearInterval(timerId);
        } 
    }, [isDrawing]);

    const toggleDrawing = () => {setIsDrawing(isDrawing => !isDrawing)}

    async function fetchNextCard() {
        if (cardsRemaining.current===0) {
            alert("Error: All out of cards!");
            toggleDrawing();
            return;
        }

        const drawCardURL = `${deckId.current}/draw/?count=1`;
        const cardResult = await axios.get(`${BASE_URL}/${drawCardURL}`);

        setTopCard(cardResult.data.cards[0]);
        cardsRemaining.current = cardResult.data.remaining;

        if (!cardsRemaining.current) {
            alert("Last card drawn!");
            toggleDrawing();
        }
    }

    return (
        <div className="Pile">
            <button onClick={toggleDrawing}>{isDrawing ? "Stop Drawing" : "Start Drawing"}</button>
            {topCard && <Card card={topCard}/>}
        </div>
    )
}

export default Pile;