export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const currentDay = state.days.filter(days => days.name === day);

  if (!currentDay[0]) {
    return appointments;
  }

  for (const appointment of currentDay[0].appointments) {
    appointments.push(state.appointments[appointment]);
  }

  return appointments;
}

export function getInterviewersForDay(state, day) {
  const interviewers = [];
  const currentDay = state.days.filter(days => days.name === day);

  if (!currentDay[0]) {
    return interviewers;
  }

  for (const interviewer of currentDay[0].interviewers) {
    interviewers.push(state.interviewers[interviewer]);
  }

  return interviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviews = state.interviewers[interview.interviewer];
  
  return {
    student: interview.student,
    interviewer: interviews,
  };
}