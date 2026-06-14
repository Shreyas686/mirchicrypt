import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import connect from "../../../utils/dbConnect";
import User from "../../../models/user";

const login = (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Discord({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scope: "identify email guilds.join",
      }),
    ],

    callbacks: {
      signIn: async (_user, account, profile) => {
        const user = await User.findOne({ email: profile.email });

        if (user) {
          return Promise.resolve(true);
        } else {
          User.create({
            username: profile.username + "#" + profile.discriminator,
            email: profile.email,
          })
            .then(async (result) => {
              const joined = await axios.put(
                `https://discord.com/api/guilds/783679122819514378/members/${profile.id}`,
                { access_token: account.accessToken },
                {
                  headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              return Promise.resolve(true);
            })
            .catch((err) => {
              console.log(err.message)
              return Promise.resolve(false);
            });
        }
      },
    },
    jwt: {
      signingKey: process.env.JWT_KEY,
    },
    session: {
      maxAge: 60 * 60 * 24 * 5
    }
  });

export default connect(login);
