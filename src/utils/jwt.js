import { jwtVerify, SignJWT } from "jose";
import { createSecretKey } from "crypto";

const secret = "applepieorange_7890Banana";

export const generateToken = (payload) => {
  const secretKey = createSecretKey(secret, "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(secretKey);
};

export const verifyToken = async (token) => {
  const secretKey = createSecretKey(secret, "utf-8");
  const { payload } = await jwtVerify(token, secretKey);

  return payload;
};
