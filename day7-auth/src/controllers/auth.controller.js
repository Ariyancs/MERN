const authService = require("../services/auth.service");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

async function register(req, res, next) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details.map(d => d.message) });

    const created = await authService.registerUser(value);
    // do not return password
    const { password, ...rest } = created.toObject();
    return res.status(201).json({ success: true, data: rest });
  } catch (err) {
    // service throws {status, message} sometimes
    if (err && err.status) return res.status(err.status).json({ success: false, message: err.message });
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details.map(d => d.message) });

    const { user, token } = await authService.loginUser(value);
    const { password, ...rest } = user.toObject();
    return res.status(200).json({ success: true, data: rest, token });
  } catch (err) {
    if (err && err.status) return res.status(err.status).json({ success: false, message: err.message });
    next(err);
  }
}

module.exports = { register, login };
