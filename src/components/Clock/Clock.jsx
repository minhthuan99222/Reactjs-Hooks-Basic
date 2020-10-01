import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useClock from '../../hooks/useClock';



function Clock(props) {
    const { timeString } = useClock()
    return (
        <p style={{ fontSize: '42px' }}>{timeString}</p>
    );
}

export default Clock;