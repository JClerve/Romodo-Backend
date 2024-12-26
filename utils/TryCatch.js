const tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (er) {
    console.log(er);
    return next(er);
  }
};

module.exports = tryCatch;
