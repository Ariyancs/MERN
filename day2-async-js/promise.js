function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1 }), 1000);
  });
}

function getPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["post1", "post2"]), 1000);
  });
}

function getComments() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["c1", "c2"]), 1000);
  });
}

getUser()
  .then((user) => {
    console.log("User:", user);
    return getPosts();
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return getComments();
  })
  .then((comments) => console.log("Comments:", comments))
  .catch(console.error);
