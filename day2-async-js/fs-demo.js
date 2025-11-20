const fs = require("fs").promises;

async function run() {
  try {
    await fs.writeFile("message.txt", "Hello Ariyan!");

    const data = await fs.readFile("message.txt", "utf-8");
    console.log("File content:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
