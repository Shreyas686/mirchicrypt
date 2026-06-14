import mongoose from "mongoose";

const connect = (handler) => (req, res) => {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState == 1) {
      return resolve(handler(req, res));
    } else {
      mongoose
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then(() => {
          return resolve(handler(req, res));
        })
        .catch((err) => {
          return reject(res.send("An error occured"));
        });
    }
  });
};

export default connect;
