export function convertToTimeFormat(time, format, unit = "milliseconds") {
  let seconds;
  if (unit === "milliseconds") {
    seconds = Math.round(time / 1000);
  } else if (unit === "seconds") {
    seconds = time;
  } else {
    throw new Error(
      'Invalid unit. Unit must be either "milliseconds" or "seconds".'
    );
  }

  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;
  let totalMinutes = Math.floor(seconds / 60);

  // Pad hours, minutes and seconds with 0 if they are less than 10
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }

  switch (format) {
    case "hhmmss":
      return `${hours}:${minutes}:${remainingSeconds}`;
    case "hhmm":
      return `${hours}:${minutes}`;
    case "mmss":
      return `${minutes}:${remainingSeconds}`;
    case "totalMinutes":
      return `${totalMinutes}`;
    case "ss":
      return `${remainingSeconds}`;
    default:
      return `${hours}:${minutes}:${remainingSeconds}`;
  }
}

const seconds = 3661;
