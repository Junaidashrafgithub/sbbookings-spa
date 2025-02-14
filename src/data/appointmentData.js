export const conflictAppointmentData = {
  message: "ERROR",
  startDateTime: "2025-02-14T19:00:00.000Z",
  endDateTime: "2025-02-14T20:00:00.000Z",
  conflicts: [
    {
      type: "Doctor",
      name: "abc abc",
      startDateTime: "2025-02-14T19:00:00.000Z",
      endDateTime: "2025-02-14T20:00:00.000Z",
    },
    {
      type: "Patient",
      names: ["John Doe", "Jane Smith"],
      startDateTime: "2025-02-14T19:00:00.000Z",
      endDateTime: "2025-02-14T20:00:00.000Z",
    },
  ],
};
