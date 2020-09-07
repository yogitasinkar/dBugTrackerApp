export default {
    postVisitorDetails: (visitor) => {
      let url = `/contactUs`;
      return fetch(url, {
        method: "post",
        body: JSON.stringify(visitor),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "Error" }, msgError: true };
      });
    },
};
  
