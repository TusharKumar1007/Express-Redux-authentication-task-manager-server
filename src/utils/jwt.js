import { SignJWT } from "jose";
import { createSecretKey } from "crypto";

export const generateToken = (payload) => {
  const secret = "applepieorange_7890Banana";
  const secretKey = createSecretKey(secret, "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(secretKey);
};
