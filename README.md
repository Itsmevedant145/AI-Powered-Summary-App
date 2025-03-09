AI-Powered PDF Summary App
A web application that allows users to upload PDF files and receive concise summaries powered by Google's AI API. The summarized content is displayed in a clean React component for easy reading.

📝 Features
📄 Upload PDF files directly from your device.
🤖 Get AI-generated summaries of your PDF content.
⚛️ Clean and simple React frontend.
🚀 Fast and responsive interface using Vite.
🗂️ Backend powered by Node.js and Express.
🔒 Secure file handling and uploads.
🚀 Project Structure
pgsql
Copy
Edit
AI-Powered-Summary-App/
├── backend/
│   ├── node_modules/
│   ├── uploads/
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
🛠️ Technologies Used
Frontend
React
Vite
Regular CSS (No external styling libraries)
Backend
Node.js
Express.js
Multer (for file uploads)
Google AI API (for generating summaries)
📂 How to Run the Project Locally
Backend Setup
Navigate to the backend directory:
bash
Copy
Edit
cd backend
Install dependencies:
bash
Copy
Edit
npm install
Start the backend server:
bash
Copy
Edit
node server.js
Frontend Setup
Navigate to the frontend directory:
bash
Copy
Edit
cd frontend
Install dependencies:
bash
Copy
Edit
npm install
Start the frontend development server:
bash
Copy
Edit
npm run dev
Access the App
Open your browser and navigate to http://localhost:5173 (or the port specified by Vite).
📥 How It Works
Upload your PDF file via the upload form on the React frontend.
The backend (Node.js) handles file upload and processing.
It sends the content to Google's AI API to generate a summary.
The summary is returned and displayed neatly on a React component.
📌 Future Improvements
Implement user authentication (login/signup).
Add support for multiple languages.
Improve UI with a modern component library like Material-UI or Tailwind CSS.
Download summarized content as a text file.
🤝 Contributing
Feel free to fork this repository and open pull requests to suggest improvements or fix bugs.

📄 License
This project is licensed under the MIT License.
