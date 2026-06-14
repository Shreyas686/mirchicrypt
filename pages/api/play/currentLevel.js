import connect from "../../../utils/dbConnect";
import { getSession } from "next-auth/client";
import User from "../../../models/user";
import Level from "../../../models/level";

const handler = async (req, res) => {
  if (req.method != "GET") {
    return res.json({ error: "METHOD NOT DEFINED FOR THIS ROUTE" });
  }


  const startDate = new Date("December 25, 2020 11:59:59");
  const todayDate = Date.now();

  if (startDate >= todayDate) {
    return res.json({
      success: false,
      message: "The hunt will start on December 25, 2020 at 12:00 noon IST",
    });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.json({ success: false, message: "You are not worthy" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.json({
      success: false,
      message: "An error occured. Please contact the admins",
    });
  }

  if (user.disqualified) {
    return res.json({ success: false, message: "You are Disqualified" });
  }

  if (user.currentLevel > 1) {
    return res.json({
      success: false,
      message: "Congrats! You have completed the hunt",
    });
  }
  const level = await Level.findOne({ level: user.currentLevel }).select(
    "-answer"
  );
  return res.json({ success: true, level: level });
};

export default connect(handler);
