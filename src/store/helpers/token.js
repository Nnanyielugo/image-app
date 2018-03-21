let token = null;
const tokenInStorage = localStorage.getItem('token');
if(tokenInStorage !== null) {
  token = {
    headers: { Authorization: "Bearer " + tokenInStorage}
  }
}

export default token;