//  const axios = require('axios');

export default {
  login: (user) => {

    return fetch("/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return { isAuthenticated: false, user: { username: "", password: "" } };
    });
  },

  register: (user) => {
    return fetch("/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },

  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      // passport will send a 401 status code if unauthorized
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { username: "", role: "" } };
    });
  },

  getUserByUsername: (username) => {
    return fetch(`/user/${username}`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => {
          return data;
        });
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  editUser: (username,user) => {
    let url = `/user/${username}/edit`;
    return fetch(url, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
};
