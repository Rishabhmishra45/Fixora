import { OAuth2Client } from "google-auth-library";
import env from "../config/env.js";

const client = new OAuth2Client(env.googleClientId);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: env.googleClientId
  });

  return ticket.getPayload();
};

export default verifyGoogleToken;
