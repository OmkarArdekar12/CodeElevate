import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

//https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   server: {
//     port: 3000,
//     open: true,
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// //https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   build: {
//     chunkSizeWarningLimit: 2700,
//   },
// });

// vercel.json
// {
//   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
// }

// vercel.json
// {
//   "headers": [
//     {
//       "source": "/sitemap.xml",
//       "headers": [{ "key": "Content-Type", "value": "application/xml" }]
//     },
//     {
//       "source": "/robots.txt",
//       "headers": [{ "key": "Content-Type", "value": "text/plain" }]
//     }
//   ],
//   "rewrites": [
//     { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
//     { "source": "/robots.txt", "destination": "/robots.txt" },
//     { "source": "/(.*)", "destination": "/index.html" }
//   ]
// }
