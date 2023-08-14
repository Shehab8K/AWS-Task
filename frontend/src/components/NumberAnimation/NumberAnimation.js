import React from 'react';
import CountUp from 'react-countup';

const NumberAnimation = ({ targetNumber }) => {
  return <CountUp start={0} end={targetNumber} duration={2} />;
};

export default NumberAnimation;
