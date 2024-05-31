import crypto from "crypto";

export const generateRandomString = (length: number) => {
	length = (length % 2 === 0) ? length : length + 1;
	return crypto.randomBytes(length/2).toString("hex");
};
