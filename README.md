<h1>CodeElevate</h1>

<h2>CodeElevate - Elevate Your Coding Journey</h2>
<h3>CodeElevate is a dynamic coder community built to empower competitive programmers, software developers, students, and professionals. The platform provides an all-in-one ecosystem featuring integrated coding statistics, development statistics, a real-time messaging system, user connection system, post sharing and engagement, personalized profiles, a profile management system, a community-driven and category-based ranking system, a notification system, search and filter functionality, and a responsive UI design - fostering growth, collaboration, and innovation among coders worldwide.</h3>

<h2><a href="https://codeelevate-community.vercel.app/">Live: https://codeelevate-community.vercel.app</a></h2>

<h2>Description</h2>
<h3> CodeElevate is a MERN Stack-based web-application that empowers users to showcase their coding and development profiles all in one place. It provides a unified platform where learners, competitive programmers, professionals, coders and developers can analyze, track, and elevate their progress in both competitive programming and software development. Users can compete, connect, and grow together by earning ranks across multiple categories, building meaningful connections, and engaging through posts, connections, and real-time messaging features. At CodeElevate, our goal is to inspire growth, celebrate achievement, and create a community where every coder can rise to their full potential.</h3>

<h2>Features</h2>
<table border="1">
  <thead>
    <tr>
      <th>S.No.</th>
      <th>Feature</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1.</td>
      <td><b>User Authentication & Authorization - Two-Factor Authentication (2FA) using TOTP (Time Time-based One-Time Password)</b></td>
      <td>Robust and Secure authentication using Passport, Passport-Local-Strategy, Sessions, JWT, and Two-Factor Authentication (2FA) via TOTP and QR code for enhanced account protection.</td>
    </tr>
    <tr>
      <td>2.</td>
      <td><b>User Profile System & User Profile Management System</b></td>
      <td>Comprehensive profiles with editable details, skills, education, social links, user details, coding profiles, and customizable profile images and banners.</td>
    </tr>
    <tr>
      <td>3.</td>
      <td><b>Competitive Programming and Development Profiles Stats</b></td>
      <td>Users can add their Competitive Programming or Coding profiles (LeetCode, Codeforces, AtCoder, CodeChef, GeeksforGeeks, HackerRank) and development profiles (GitHub, GitLab). After enabling the Stats feature, real-time data from LeetCode, Codeforces, and GitHub APIs are displayed.</td>
    </tr>
    <tr>
      <td>4.</td>
      <td><b>Search & Filter Search Functionality</b></td>
      <td>Smart, responsive search by name, role, domain, or tags, with advanced filters for Trending, CP, Devs, Experience, and Professionals.</td>
    </tr>
    <tr>
      <td>5.</td>
      <td><b>Real-Time Messaging</b></td>
      <td>Instant one-on-one text and image chat built using Socket.IO and Socket.IO Client, featuring real-time communication, online user detection, responsive UI and smooth UI animations.</td>
    </tr>
    <tr>
      <td>6.</td>
      <td><b>Connection System</b></td>
      <td>Follow, unfollow, connect, disconnect, and message users seamlessly with real-time messaging system, connection status tracking and notifications.</td>
    </tr>
    <tr>
      <td>7.</td>
      <td><b>Ranking System</b></td>
      <td>Dynamic leaderboards across five categories — Competitive Programmers, Developers, Rankers, Contributors, and All-Rounders — using live API data. Rankings automatically updated every 24 hours.</td>
    </tr>
    <tr>
      <td>8.</td>
      <td><b>Post Feature</b></td>
      <td>Create, edit, and delete posts with image uploads to share updates and achievements. Add or delete comments, and like or unlike posts seamlessly.</td>
    </tr>
    <tr>
      <td>9.</td>
      <td><b>Notification System</b></td>
      <td>Notifications for follows, unfollows, likes, and connection requests (including accept or reject responses), with robust management and auto-expiry.</td>
    </tr>
    <tr>
      <td>10.</td>
      <td><b>API (Application Programming Interface) Routes</b></td>
      <td>Modular, secure REST API with layered authentication, authorization, Two-Factor Authentication (2FA), and validation middleware for scalability and maintainability.</td>
    </tr>
    <tr>
      <td>11.</td>
      <td><b>Architecture & Security</b></td>
      <td>Developed using the MERN Stack, Socket.IO, and Cloudinary for cloud storage management, with Two-Factor Authentication, authorization, and validation layers implemented for robust performance and security.</td>
    </tr>
    <tr>
      <td>12.</td>
      <td><b>3D Interactive Logo</b></td>
      <td>An immersive 3D CodeElevate logo showcased on the About page with multiple camera angles and styling variations, built with dynamic animations for a captivating visual experience.</td>
    </tr>
    <tr>
      <td>13.</td>
      <td><b>Animations & Transitions</b></td>
      <td>Smooth, visually appealing animations and transitions across pages and components using Framer Motion, enhancing interactivity and user engagement throughout the platform.
      </td>
    </tr>
    <tr>
      <td>14.</td>
      <td><b>Responsive UI/UX (User Interface and User Experience)</b></td>
      <td>Modern, mobile-first, fully responsive interface built with React, Tailwind CSS, and Framer Motion, featuring smooth animations and visually rich, accessible experiences across all screen sizes.</td>
    </tr>
  </tbody>
</table>

<h2>Technologies Used</h2>
<h3>
  <ul>
    <li>Frontend: <h4>React.js, Vite, Tailwind CSS, Socket.io Client, Framer Motion, Axios, Three.js, React Router DOM, React Hot Toast, React Slick, Slick Carousel, Lucide React, React Icons, FontAwesome</h4></li>
    <li>Backend: <h4>Node.js, Express.js, MongoDB, Mongoose, Socket.io, Passport.js, Passport-Local, Cloudinary, Multer, Multer-Storage-Cloudinary, Joi, CORS (Cross-Origin Resource Sharing), Axios</h4></li>
    <li>Authentication & Security: <h4>Passport.js, Passport-Local-Strategy, Connect-Mongo (for Passport Session Store), JWT (Json Web Token), bcrypt.js, Express-Session, Cookie-Parser, Body-Parser, Speakeasy (2FA), QRCode (2FA), Joi Validations</h4></li>
    <li>APIs Integrated: <h4>LeetCode API, Codeforces API, GitHub API (for Displaying Competitive Programming or Coding Profiles Stats and Development Profiles Stats)</h4></li>
    <li>Development Tools: <h4>Nodemon, Vite Build, dotenv</h4></li>
    <li>Deployment: <h4>Frontend on Vercel, Backend on Render</h4></li>
  </ul>
</h3>

<h2>MongoDB Database Structure</h2>
<div width="90%" align="center">
  <img src="./backend/src/lib/docs/mongodbDatabaseStructure.png" alt="Database Structure Diagram" width="100%"/>
</div>
