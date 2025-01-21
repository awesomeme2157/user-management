// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // If you want to automatically open the app in the browser:
    // open: true,
    // If your backend is on 4000 and you want to avoid CORS, you could do:
    /*
    proxy: {
      '/api': 'https://user-management-s0d3.onrender.com',
    },
    */
  },
})
