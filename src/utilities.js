const helperFunctions = {
  reformatDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let newToday = `${yyyy}/${mm}/${dd}`;
    console.log(newToday)
    return newToday;
  }
}


export default helperFunctions;
