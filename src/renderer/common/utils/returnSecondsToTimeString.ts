const returnSecondsToTimeString = (currTime: number): string => {
  if (currTime < 60) {
    if (currTime < 10) return `00:0${parseInt(currTime)}`;
    return `00:${parseInt(currTime)}`;
  } else if (currTime === 60) return `01:00`;
  let minutes: number = 0;
  let seconds: number = 0;
  while (true) {
    if (currTime >= 60) {
      currTime = currTime - 60;
      minutes = minutes + 1;
    } else {
      seconds = currTime;
      break;
    }
  }
  let min: string = String(parseInt(minutes));
  let sec: string = String(parseInt(seconds));
  if (parseInt(min) < 10) {
    min = `0${min}`;
  }
  if (parseInt(sec) < 10) {
    sec = `0${sec}`;
  }
  return `${min.slice(0, 2)}:${sec.slice(0, 2)}`;
};

export default returnSecondsToTimeString;
