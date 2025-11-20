function getUser(cb) {
  setTimeout(() => cb({ id: 1 }), 1000);
}

function getPosts(user, cb) {
  setTimeout(() => cb(["post1", "post2"]), 1000);
}

function getComments(post, cb) {
  setTimeout(() => cb(["comment1", "comment2"]), 1000);
}

getUser((user) => {
  console.log("User:", user);

  getPosts(user, (posts) => {
    console.log("Posts:", posts);

    getComments(posts[0], (comments) => {
      console.log("Comments:", comments);
    });
  });
});
