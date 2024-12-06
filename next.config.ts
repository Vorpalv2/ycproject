import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental:{
        after:true,
        ppr:"incremental"
    },
    devIndicators:{
      appIsrStatus:true,
      buildActivity:true,
      buildActivityPosition:"bottom-right"
    },
  /* config options here */
    images:{
        dangerouslyAllowSVG:true,
        remotePatterns:[
            {
                protocol:"https",
                hostname:"*"
            }
        ]
    }
};

export default nextConfig;
