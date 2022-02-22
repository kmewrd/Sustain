// Your fetch requests will live here!
const fetchData = (extension) => {
  return fetch(`https://fitlit-api.herokuapp.com/api/v1/${extension}`)
    .then(response => response.json())
    .catch(err => console.log(err));
};

export {fetchData};
