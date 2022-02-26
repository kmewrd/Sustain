// Your fetch requests will live here!
const fetchData = (extension) => {
  return fetch(`http://localhost:3001/api/v1/${extension}`)
    .then(response => response.json())
    .catch(err => console.log(err));
};

const postData = (data, url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`, {
    method: 'POST',
    body: json.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(response => response.json())
  .catch(err => console.log(err));
};

export {fetchData, postData};
git@github.com:turingschool-examples/fe2-fetch-practice.git