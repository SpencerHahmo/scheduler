export function getAppointmentsForDay(state, day) {
  const appointments = [];

  state.days.map(days => {
    if (days.name === day) {
      days.appointments.filter(appointment => appointments.push(state.appointments[appointment]));
    }
  });

  return appointments;
}