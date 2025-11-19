async function sendEmail(to, subject, body) {
  console.log('(email) to:', to, 'subject:', subject);
  return { ok:true };
}
module.exports = { sendEmail };