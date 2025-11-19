async function sendNotification(userId, payload) {
  console.log('(notify) user:', userId, payload);
  return { ok:true };
}
module.exports = { sendNotification };
