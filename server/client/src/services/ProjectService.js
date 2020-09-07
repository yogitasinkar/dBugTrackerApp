export default {
  getProjects: () => {
    return fetch("/projects").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  postProject: (project) => {
    return fetch("/projects", {
      method: "post",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },

  getUsers: () => {
    return fetch("/user").then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  getProjectById: (proj_id) => {
    return fetch(`/projects/${proj_id}`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => {
          return data;
        });
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  editProject: (project,proj_id) => {
    let url = `/projects/${proj_id}/edit`;
    return fetch(url, {
      method: "post",
      body: JSON.stringify(project),
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
