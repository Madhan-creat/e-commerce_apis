

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 4000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};
const config = {
 
  server: SERVER,
  authsecretkey: "wdh-3d12-sed",
};

export default config;