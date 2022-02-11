// Your fetch requests will live here!
const fetchUserData = () => {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/users").then(response => response.json());
}

const fetchHydrationData = () => {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration").then(response => response.json());
}

const fetchSleepData = () => {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/sleep").then(response => response.json());
}

export {fetchUserData, fetchHydrationData, fetchSleepData};
