// Your fetch requests will live here!
const fetchData = (extension) => {
  return fetch(`http://localhost:3001/api/v1/${extension}`)
    .then(response => response.json())
    .catch(err => console.log(err));
};

const postSleep = (sleep) => {
  return fetch('http://localhost:3001/api/v1/sleep', {
    method: 'POST',
    body: json.stringify(sleep),
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(response => response.json())
  .catch(err => console.log(err));
};

export {fetchData, postSleep};
