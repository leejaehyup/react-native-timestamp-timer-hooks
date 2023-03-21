import { useCallback, useEffect, useRef, useState } from 'react';
import { getCurrentTimeStamp } from '../util';

export interface IUseStopWatchParams {
  from: number;
  to?: number;
  interval?: number;
}
/**
 * Custom countdown hooks
 *
 * @param {number} from The milliseconds time the countdown starts
 * @param {number} to The milliseconds time the countdown ends
 * @param {number} interval setInterval milliseconds
 * @default interval 50
 *
 * @returns { counter, start, stop, reset, isStart }
 */
export const useCountdown = ({
  from,
  to,
  interval = 50,
}: IUseStopWatchParams): {
  counter: number;
  start: () => void;
  stop: () => void;
  reset: (from?: number) => void;
  isStart: boolean;
} => {
  const [counter, setCounter] = useState<number>(from || 0);
  const [isStart, setIsStart] = useState<boolean>(false);

  const timeStmapTimer = useRef<{
    startTimeStamp: number;
    endTimeStamp: number;
    remainingTime: number;
  }>({
    startTimeStamp: 0,
    endTimeStamp: 0,
    remainingTime: from || 0,
  });

  const intervalRef = useRef<number | NodeJS.Timer>(0);

  const start: () => void = () => {
    const is = !(to && to > counter);
    setIsStart(is);
  };

  const stop: () => void = () => setIsStart(false);

  const reset: (resetFrom?: number) => void = useCallback(
    (resetFrom?: number) => {
      setCounter(resetFrom !== undefined ? resetFrom : from);
      stop();
      timeStmapTimer.current.remainingTime =
        resetFrom !== undefined ? resetFrom : from;
      if (resetFrom) {
        timeStmapTimer.current.endTimeStamp =
          getCurrentTimeStamp() + resetFrom !== undefined ? resetFrom : from;
      }
    },
    [from]
  );

  useEffect(() => {
    if (isStart) {
      timeStmapTimer.current.startTimeStamp = getCurrentTimeStamp();
      timeStmapTimer.current.endTimeStamp =
        timeStmapTimer.current.startTimeStamp +
        timeStmapTimer.current.remainingTime;
      const intervalId = setInterval(() => {
        const remainingTime =
          timeStmapTimer.current.endTimeStamp - getCurrentTimeStamp();
        timeStmapTimer.current.remainingTime = remainingTime;
        if (to && to > remainingTime) {
          setCounter(to);
          stop();
        } else {
          if (remainingTime > 0) {
            setCounter(remainingTime);
          } else {
            setCounter(0);
            stop();
          }
        }
      }, interval);
      intervalRef.current = intervalId;
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStart, interval, to]);

  return { counter, start, stop, reset, isStart };
};


