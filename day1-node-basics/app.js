// app.js
import fs from "fs";
import os from "os";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { add, subtract, multiply, divide } from "./math.js";

// Get dirname + filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- System Info ----
console.log(chalk.cyan.bold("🖥 System Info"));
console.log("Platform:", os.platform());
console.log("Total Memory:", os.totalmem());
console.log("CPU Cores:", os.cpus().length);
console.log("");

// ---- File Operations ----
const filePath = path.join(__dirname, "sample.txt");
fs.writeFileSync(filePath, "Hello Node.js! Learning Day 1 🚀");
const fileData = fs.readFileSync(filePath, "utf-8");
console.log(chalk.magenta.bold("File Content:"), fileData);
console.log("");

// ---- Calculator ----
const results = [
  `Addition (10+5): ${add(10, 5)}`,
  `Subtraction (10-5): ${subtract(10, 5)}`,
  `Multiplication (10*5): ${multiply(10, 5)}`,
  `Division (10/5): ${divide(10, 5)}`
];

console.log(chalk.yellow.bold("Calculator Results"));
results.forEach(res => console.log(chalk.green(res)));

// Save to history.txt
const historyFile = path.join(__dirname, "history.txt");
results.forEach(res => fs.appendFileSync(historyFile, res + "\n"));

console.log(chalk.blueBright("\nResults saved to history.txt"));
