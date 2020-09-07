export default {
  getComments: (proj_id, task_id) => {
    return fetch(`/${proj_id}/tasks/${task_id}/comments`).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "UnAuthorized", msgError: true } };
      }
    });
  },

  postComment: (comment, proj_id, task_id) => {
    let url = `/${proj_id}/tasks/${task_id}/comments`;
    return fetch(url, {
      method: "post",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },

  editComment: (comment, proj_id, task_id, comment_id) => {
    let url = `/${proj_id}/tasks/${task_id}/comments/${comment_id}/edit`;
    return fetch(url, {
      method: "post",
      body: JSON.stringify(comment),
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