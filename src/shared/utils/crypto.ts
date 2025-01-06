import { AES, enc } from "crypto-js";

import envConfig from "~/config/env";

export const decryptData = (encryptedData: string) => {
	const bytes = AES.decrypt(encryptedData, envConfig.ENCRYPTION_SECRET);
	return JSON.parse(bytes.toString(enc.Utf8));
};
