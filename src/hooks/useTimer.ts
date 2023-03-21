import { useCallback, useEffect, useRef, useState } from 'react';
import { getCurrentTimeStamp } from '../util';

export interface IUseTimerParams {
  from: number;
  to?: number;
  interval?: number;
}
/**
 * Custom timer hooks
 *
 * @param {number} from The milliseconds time the timer starts
 * @param {number} to The milliseconds time the timer ends
 * @param {number} interval setInterval milliseconds
 * @default interval 50
 *
 * @returns { counter, start, stop, reset, isStart }
 */
export const useTimer = ({
  from,
  to,
  interval = 50,
}: IUseTimerParams): {
  counter: number;
  start: () => void;
  stop: () => void;
  reset: (from?: number) => void;
  isStart: boolean;
} => {
  const [counter, setCounter] = useState<number>(from || 0);
  const [isStart, setIsStart] = useState<boolean>(false);

  const timeStmapTimerRef = useRef<{
    startTimeStamp: number;
    initTimeStamp: number;
  }>({
    startTimeStamp: 0,
    initTimeStamp: from || 0,
  });
  const intervalRef = useRef<number | NodeJS.Timer>(0);

  const start: () => void = () => {
    const is = !(to && to < counter);
    setIsStart(is);
  };
  const stop: () => void = () => setIsStart(false);

  const reset: (resetFrom?: number) => void = useCallback(
    (resetFrom?: number) => {
      setCounter(resetFrom !== undefined ? resetFrom : from);
      stop();
      timeStmapTimerRef.current.initTimeStamp =
        resetFrom !== undefined ? resetFrom : from;
    },
    [from]
  );

  useEffect(() => {
    if (isStart) {
      timeStmapTimerRef.current.startTimeStamp = getCurrentTimeStamp();
      const intervalId = setInterval(() => {
        const localCounter =
          getCurrentTimeStamp() -
          timeStmapTimerRef.current.startTimeStamp +
          timeStmapTimerRef.current.initTimeStamp;

        if (to && to < localCounter) {
          setCounter(to);
          stop();
        } else setCounter(localCounter);
      }, interval);
      intervalRef.current = intervalId;
    } else {
      setCounter((prev) => {
        timeStmapTimerRef.current.initTimeStamp = prev;
        return prev;
      });
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStart, interval, to]);

  return { counter, start, stop, reset, isStart };
};
