function fetchUser(id, callback) {
  console.log("Fetching user...");

  setTimeout(() => {
    callback({ id, name: "Ariyan", role: "Student" });
  }, 2000);
}

fetchUser(1, (user) => {
  console.log("User received:", user);
});
