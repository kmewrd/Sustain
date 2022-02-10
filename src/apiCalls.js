// Your fetch requests will live here!
const fetchUserData = () => {
  return fetch("https://fitlit-api.herokuapp.com/api/v1/users").then(response => response.json()).then(data => data.userData);
}


export {fetchUserData};



console.log('I will be a fetch request!')
