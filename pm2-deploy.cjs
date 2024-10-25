module.exports = {
  apps: [
    {
      name: "302AI-AI-Tool",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
