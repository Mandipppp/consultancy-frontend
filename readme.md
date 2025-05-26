Consultancy Learning Platform – Frontend
<!-- (Add your own screenshot URL or remove) -->

A modern, scalable frontend for the Consultancy Learning Platform. Built with React, Vite, Tailwind CSS, shadcn/ui, and Lucide React icons.
Supports real-time learning, dynamic dashboards, and a premium user experience for students, tutors, and consultancy owners.

✨ Features
Premium Gen Z UI: Responsive, luxurious, and animated landing page

Role-Based Routing: Separate dashboards for Students, Tutors, and Owners

Reusable Components: Buttons, cards, modals, and more via shadcn/ui

Animated UI: Seamless transitions powered by Framer Motion

Iconography: Beautiful icons with Lucide React

Open Source Friendly: Copy and customize any component

🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/ganeshparajuli11/consultancy-frontend.git
cd consultancy-frontend
2. Install dependencies
bash
Copy
Edit
npm install
3. Set Environment Variables
Create a .env file for your frontend API endpoints (if needed):

ini
Copy
Edit
VITE_API_BASE_URL=https://your-backend-url.com
You can also set this from Vercel Dashboard > Project Settings > Environment Variables.

4. Run in Development
bash
Copy
Edit
npm run dev
Visit http://localhost:5173 in your browser.

🌐 Deployment
We recommend deploying on Vercel for best results.

Steps:

Push your latest code to GitHub.

Go to vercel.com, create a new project, and import your repo.

Set VITE_API_BASE_URL in the Vercel environment variables.

Click Deploy!

🛠️ Main Libraries & Tools
Package	Purpose
React + Vite	Lightning-fast web app framework
Tailwind CSS	Rapid UI styling with utility classes
shadcn/ui	Copy-paste, customizable Tailwind components
Framer Motion	Smooth animation for React
Lucide React	Open-source icon library
React Router DOM	Routing/navigation between pages
react-country-flag	Reliable SVG country flag display

Install (if you add features):

bash
Copy
Edit
npm install framer-motion lucide-react react-router-dom react-country-flag
npm install -D tailwindcss postcss autoprefixer
For UI blocks: see shadcn/ui install docs

🗂️ Folder Structure
bash
Copy
Edit
/src
  /components    # Shared React components
  /pages         # Route-level pages (Landing, Dashboards, etc.)
  /assets        # Images, SVGs, etc.
  /styles        # Global/custom styles
  App.jsx        # App router and layout
  index.css      # Tailwind CSS config
  main.jsx       # App entry point
🖥️ Live Demo
Visit the Live Site on Vercel
(Replace with your actual Vercel deployment URL)

🙏 Credits
Tailwind CSS

shadcn/ui

Lucide React

Framer Motion

React Country Flag

Vercel

📄 License
This project is licensed under the MIT License.

💡 Contributing
PRs and suggestions welcome! Fork the repo, make your changes, and submit a pull request.
For bugs, open an issue on GitHub.

👋 Contact
For feedback or collaboration, reach out to
Ganesh Parajuli
LinkedIn | Email

Happy Coding! 🚀

