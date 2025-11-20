async function run() {
  try {
    const user = await getUser();
    console.log("User:", user);

    const posts = await getPosts();
    console.log("Posts:", posts);

    const comments = await getComments();
    console.log("Comments:", comments);

  } catch (err) {
    console.error(err);
  }
}

run();
