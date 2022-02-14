// Your fetch requests will live here!
const fetchUserData = () => {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/users")
    .then(response => response.json())
    .catch(err => console.log(err));
};

const fetchHydrationData = () => {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
    .then(response => response.json())
    .catch(err => console.log(err));
};

const fetchSleepData = () => {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
    .then(response => response.json())
    .catch(err => console.log(err));
};

export {fetchUserData, fetchHydrationData, fetchSleepData};
