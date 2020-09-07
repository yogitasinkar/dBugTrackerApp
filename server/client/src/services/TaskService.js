export default {
  getTasks: (proj_id) => {
    return fetch(`/${proj_id}/tasks`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  getTasksByMe: (proj_id) => {
    return fetch(`/${proj_id}/tasks/assignedByMe`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  getTasksOth: (proj_id) => {
    return fetch(`/${proj_id}/tasks/oth`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  countAllTasks: (proj_id) => {
    return fetch(`/${proj_id}/tasks/all`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },
  countAllTasksResolved: (proj_id) => {
    return fetch(`/${proj_id}/tasks/all/resolved`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  getTaskById: (proj_id, task_id) => {
    return fetch(`/${proj_id}/tasks/${task_id}`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  editTask: (task, proj_id, task_id) => {
    let url = `/${proj_id}/tasks/${task_id}/edit`;
    return fetch(url, {
      method: "post",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },

  postTask: (task, proj_id) => {
    let url = `/${proj_id}/tasks`;
    return fetch(url, {
      method: "post",
      body: JSON.stringify(task),
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
};
