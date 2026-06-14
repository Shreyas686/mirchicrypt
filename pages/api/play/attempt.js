import connect from "../../../utils/dbConnect";
import Log from "../../../models/log";
import User from "../../../models/user";
import Level from "../../../models/level";
import { getSession } from "next-auth/client";

const handler = async (req, res) => {
  if (req.method != "POST") {
    return res.json({
      success: false,
      message: "Method not defined for this route",
    });
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
    return res.json({
      success: false,
      message: "An error occured. Please refresh your screen and try again",
    });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.json({
      success: false,
      message: "An error occured. Please refresh your screen and try again",
    });
  }

  if (user.disqualified) {
    return res.json({
      success: false,
      message: "An error occured. Please refresh your screen and try again",
    });
  }

  const attempt = req.body.attempt;
  const level = await Level.findOne({ level: user.currentLevel });

  let dateUTC = new Date();
  dateUTC = dateUTC.getTime();
  let dateIST = new Date(dateUTC);
  dateIST.setHours(dateIST.getHours() + 5);
  dateIST.setMinutes(dateIST.getMinutes() + 30);

  const log = await Log.create({
    username: user.username,
    email: user.email,
    level: user.currentLevel,
    attempt: attempt,
    time: dateIST.toUTCString(),
  });

  if (attempt != level.answer) {
    return res.json({ success: false, message: "Wrong Answer. Try again" });
  } else if (attempt == level.answer) {
    const newUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { solvedAt: Date.now(), $inc: { currentLevel: 1 } }
    );
    return res.json({
      success: true,
      message: "Congrats! This is the right answer",
    });
  }

  return res.json({
    success: false,
    message: "An error occured. Reload the page and try again",
  });
};

export default connect(handler);
