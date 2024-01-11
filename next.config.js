/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		reactStrictMode: true,
		domains: ["newbucketpj.s3.us-west-1.amazonaws.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "newbucketpj.s3.us-west-1.amazonaws.com",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
