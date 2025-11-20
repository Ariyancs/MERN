console.log("Synchronous Example:");
console.log("Start");
console.log("Middle");
console.log("End");

console.log("\nAsynchronous Example:");
console.log("Start");

setTimeout(() => {
  console.log("Async Task Done!");
}, 2000);

console.log("End");
