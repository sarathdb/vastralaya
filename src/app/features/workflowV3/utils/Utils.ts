import { TaskStatusTypes } from "../enum/TaskStatus";

export const getWorkflowDateFormat = (date: number) => {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });

  return formattedDate;
};

export const calculateDuration = (
  startTime: number,
  endTime: number
): string => {
  if (endTime < startTime) {
    return "Invalid duration";
  }

  const durationMs = endTime - startTime;

  const durationSeconds = Math.floor(durationMs / 1000);
  const durationMinutes = Math.floor(durationSeconds / 60);
  const durationHours = Math.floor(durationMinutes / 60);

  const remainingSeconds = durationSeconds % 60;
  const remainingMinutes = durationMinutes % 60;
  const remainingHours = durationHours;

  const formattedHours = remainingHours.toString().padStart(2, "0");
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const getWorkflowStatusColor = (status: string) => {
  switch (status) {
    case TaskStatusTypes.COMPLETED:
      return "green";
    case TaskStatusTypes.RUNNING:
      return "orange";
    case TaskStatusTypes.FAILED:
      return "red";
    case TaskStatusTypes.IN_PROGRESS:
      return "orange";
    case TaskStatusTypes.NOT_STARTED:
      return "#A0c4FF";
    default:
      return "#ddd";
  }
};
