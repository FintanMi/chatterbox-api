import emptyStar from '../assets/star.png';
import star from '../assets/starfilled.png';
import { useState } from 'react';

const styledConatiner = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
};

const ratingContainer = {
    display: 'flex',
    gap: '1.2rem',
};

const starStyle = {
    width: '2rem',
    height: '2rem',
    display: 'block',
    cursor: 'pointer',
};

const numText = {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '1rem',
    marginTop: '2.3rem',
    fontSize: '1.2rem',
};

export default function Rating({ maxRating = 5 }) {
    const [rating, setRating] = useState(1);
    const [hoverRating, setHoverRating] = useState(0);

    function handleRating(rating) {
        setRating(rating);
    }

    function Star({ onRate, fullStar, onHoverIn, onHoverOut }) {
        return (
            <span role="button" style={starStyle} onClick={onRate}
                onMouseEnter={onHoverIn}
                onMouseLeave={onHoverOut}
            >
                {fullStar ? (<img src={star} alt='star' />) :
                    (<img src={emptyStar} alt='star' />)
                }
            </span>
        );
    }

    return (
        <div style={styledConatiner}>
            <div style={ratingContainer}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setHoverRating(i + 1)}
                        onHoverOut={() => setHoverRating(0)}
                        fullStar={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
                    />
                ))}
            </div>
            <p style={numText}>{hoverRating || rating || ""}</p>
        </div>
    );
}
