function task(ms) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(ms + "ms done"), ms)
  );
}

Promise.all([task(1000), task(2000), task(3000)])
  .then(console.log);
