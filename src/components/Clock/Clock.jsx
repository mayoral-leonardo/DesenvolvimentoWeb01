import React, { useEffect, useState } from 'react';

export default function Clock() {
  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return <div style={{fontSize: '30px'}}>{clock}</div>;
}