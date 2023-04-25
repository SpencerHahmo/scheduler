import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers')),
    ])
    .then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function spotsCount(day, appointments) {
    let spots = 0;

    for(const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    return spots;
  }

  function spotsRemaining(dayName, days, appointments) {
    const currentDay = days.filter(day => day.name === dayName);
    const spots = spotsCount(currentDay[0], appointments);

    const updatedSpots = days.map(day => {
      if (day.name === dayName) {
        return { ...day, spots };
      }
      return day;
    });

    return updatedSpots;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = spotsRemaining(state.day, state.days, appointments);

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, days: spots }));
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = spotsRemaining(state.day, state.days, appointments);

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days: spots }));
  };

  return { state, setDay, bookInterview, cancelInterview };
}