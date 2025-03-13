import React from 'react';

import style from './App.module.css';

function App() {
  const [minute, setMinute] = React.useState<number>(25);
  const [second, setSecond] = React.useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);

  React.useEffect(function () {
    let interval: number | undefined = undefined;

    if (isTimerRunning) {
      interval = setInterval(function () {
        if (second > 0) {
          setSecond(second - 1);
        } else if (second === 0) {
          setMinute(minute - 1);
          setSecond(59);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [minute, second, isTimerRunning]);

  const handleButtonClick = React.useCallback(function () {
    setIsTimerRunning(!isTimerRunning);
  }, [isTimerRunning]);

  return (
    <button
      className={style.Clock}
      onClick={handleButtonClick}
      title='Click to start timer, click again to pause.'
    >
      {minute < 9 ? `0${minute}` : minute}:{second < 9 ? `0${second}` : second}
    </button>
  )
}

export default App
