import { getlocal, storelocal } from "../localstore";
import { checktokensexpiry } from "../utils";

export const refreshTokenSetup = () => {
    // Timing to renew access token
    let refreshTiming = ( 900 - 2 * 60) * 1000;
    console.log("+++++++++++++++++++++ refresh token setup +++++++++++++++++++++++++");
    const refreshToken = async () => {
       
      checktokensexpiry(getlocal("access_token"),getlocal("at_expiresin"),getlocal("rt_expiresin"))
      refreshTiming = ( 900 - 2 * 60) * 1000;
      
      // Setup the other timer after the first one
      window.clearTimeout(getlocal("refreshtimeout"))
      const refreshtimeout = setTimeout(refreshToken, refreshTiming);
      storelocal("refreshtimeout" ,refreshtimeout  )
      
      

    };
  
    // Setup first refresh timer
    window.clearTimeout(getlocal("refreshtimeout"))
    refreshToken()
    const refreshtimeout = setTimeout(refreshToken, refreshTiming);
    console.log("refreshtimeout" , refreshtimeout);

    
  };