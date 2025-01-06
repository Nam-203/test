import { z } from "zod";

const configSchema = z.object({
	NEXT_PUBLIC_API_ENDPOINT: z.string(),
	NEXT_PUBLIC_URL: z.string(),
	ENCRYPTION_SECRET: z.string(),
});

const configProject = configSchema.safeParse({
	// phải khai báo cụ thể tên biến môi trường để check lỗi được chính xác thay vì chỉ check process.env
	NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
	NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
	ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
});

if (!configProject.success) {
	console.error(configProject.error.issues);
	throw new Error(
		"Please provide the correct environment variables. Refer to the .env.example file for more information",
	);
}

const envConfig = configProject.data;
export default envConfig;
