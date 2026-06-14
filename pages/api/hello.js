// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import connect from "../../utils/dbConnect";

const hello = (req, res) => {
  res.status(200).json({ name: mongoose.connection.readyState });
};

export default connect(hello);
