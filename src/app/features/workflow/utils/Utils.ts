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
  const durationMs = endTime - startTime;

  const durationSeconds = Math.floor(durationMs / 1000);
  const durationMinutes = Math.floor(durationSeconds / 60);
  const durationHours = Math.floor(durationMinutes / 60);

  const remainingSeconds = durationSeconds % 60;
  const remainingMinutes = durationMinutes % 60;

  const period = durationHours >= 12 ? "PM" : "AM";
  const formattedHours = (durationHours % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
};

export const getWorkflowStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "green";
    case "PENDING":
      return "orange";
    case "FAILED":
      return "red";
    default:
      return "#ddd";
  }
};
