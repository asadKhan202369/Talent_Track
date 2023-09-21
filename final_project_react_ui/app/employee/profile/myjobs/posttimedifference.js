// PostTimeDifference.js
import React, { useState, useEffect } from 'react';

const formatTimeDifference = (createdTime) => {
  const currentTime = new Date();
  const timeDifference = currentTime - createdTime;
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  if (hoursDifference < 1) {
    return 'Just now';
  } else if (hoursDifference < 24) {
    return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const daysDifference = Math.floor(hoursDifference / 24);
    return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
  }
};

const PostTimeDifference = ({ createdTime }) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const calculatedTime = formatTimeDifference(createdTime);
    setFormattedTime(calculatedTime);
  }, [createdTime]);

  return <span>{formattedTime}</span>;
};

export default PostTimeDifference;
