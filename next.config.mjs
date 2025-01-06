/** @type {import('next').NextConfig} */
const nextConfig = {
	// Tắt chế độ strict mode để không phải quản lý state cho date và views trong react-big-calendar
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				port: "",
				pathname: "/wikipedia/commons/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "5001",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "example.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	i18n: {
		locales: ["en", "vi", "ja"],
		defaultLocale: "en",
		localeDetection: false,
	},
	env: {
		ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
	},
	// Thêm cấu hình ESLint để bỏ qua kiểm tra khi build
	eslint: {
	  // Warning: This allows production builds to successfully complete even if
	  // your project has ESLint errors.
	  ignoreDuringBuilds: true
	},
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.(".svg"),
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ["@svgr/webpack"],
			},
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default nextConfig;
