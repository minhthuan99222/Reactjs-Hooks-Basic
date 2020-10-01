import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ColorBox.scss';

ColorBox.propTypes = {

};

function getRandomColor() {
    const COLOR_LIST = ['red', 'orange', 'green', 'blue', 'darkblue'];
    return COLOR_LIST[Math.trunc(Math.random() * 5)]
}

function ColorBox() {

    const [color, setColor] = useState(() => {
        const initialState = localStorage.getItem('box-color') || 'deeppink';
        console.log('fuck')
        return initialState
    })

    function handleBoxClick() {
        //get random color
        const newColor = getRandomColor();
        setColor(newColor)
        localStorage.setItem('box-color', newColor)
    }
    return (
        <div
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={handleBoxClick}
        >
            Color Box
        </div>
    );
}

export default ColorBox;