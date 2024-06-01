import { useState, useEffect } from 'react';
import logo from './assets/react.svg'
import { TimerDisplay } from './TimerDisplay';
import './style.css';

// ⁠App: The main component that manages the state and 
// renders other components
const App = () => {
  const [timerValue, setTimerValue] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, seconds]);

  // ⁠TimerInput: A component for setting the countdown time.
  const timerInput = (e) => {
    setTimerValue(e.target.value);
  };
  

  // Timer controls start
  // Could not be wrapped in a component because it did not work
   const startTimer = () => {
     const totalSeconds = parseInt(timerValue, 10)
    setSeconds(totalSeconds);
    setIsActive(true);
    setIsPaused(false);
  };

   const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

   const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(0);
    setTimerValue(0);
 };


  return (
    <div>
    <header>
    <nav>
      <div>
        <img src={logo} alt="kodecamp logo" width={50} />
      </div>
      <div className='nav-text'>
      <h1>Kodecamp React task</h1>
      <p>Countdown Timer</p>
      </div>
    </nav>
  </header>

    <div className="App">
      <input
        type="number"
        value={timerValue}
       onChange={timerInput}
        placeholder="Enter seconds"
      />
      <br />
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>{isPaused ? 'Resume' : 'Pause'}</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <h2>{TimerDisplay(seconds)}</h2>
      </div>
    </div>
    
    <footer>
      <p>Developed by <span>Abubakar Sadiq</span></p>
    </footer>
  </div>
  );
};


export default App
