module.exports = (err, req, res, next) => {
    console.error(err);

    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: messages
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Duplicate key",
            key: err.keyValue
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid ID"
        });
    }

    return res.status(500).json({
        success: false,
        message: "Server error"
    });
};
