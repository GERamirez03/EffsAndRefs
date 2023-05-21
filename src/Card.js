import React from 'react';

const Card = ({ card }) => {
    const { image, value, suit } = card;
    // console.log(`${value} of ${suit}`);
    // console.log(`${image}`);

    return (
        <>
            {image && 
            <div className="Card">
                <img src={image} alt={`${value} OF ${suit}`}/>
                <p>{`${value} OF ${suit}`}</p>
            </div>}
        </>
    )
}

export default Card;