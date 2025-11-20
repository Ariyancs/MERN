function fakeFetch() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Ariyan" }), 2000);
  });
}

async function simulate() {
  console.log("Fetching data...");
  const data = await fakeFetch();
  console.log("Processing data...");
  console.log("Done!", data);
}

simulate();
