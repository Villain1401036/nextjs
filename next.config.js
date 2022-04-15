const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  webpack5: true,
  webpack: (config ,{isServer}) => {
    if (!isServer){
      config.resolve.fallback = {
         fs: false 
       
          };
    }
   
 
    return config;
  },
});

