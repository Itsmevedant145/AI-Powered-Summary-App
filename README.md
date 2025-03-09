AI-Powered PDF Summary App
A web application that allows users to upload PDF files and receive concise summaries powered by Google's AI API. The summarized content is displayed on a clean and simple React component.

🚀 Features
📄 Upload PDF files directly from your device
🤖 AI-generated summaries of PDF content
⚛️ Clean React frontend (using regular CSS)
🗂️ Backend powered by Node.js and Express
🔒 Secure file handling and uploads
🗂️ Project Structure
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
CSS (No external styling libraries)
Backend
Node.js
Express.js
Multer (for file uploads)
Google AI API (for summaries)
📥 Getting Started
Backend Setup
Navigate to the backend directory
cd backend
Install dependencies
npm install
Start the backend server
node server.js
Frontend Setup
Navigate to the frontend directory
cd frontend
Install dependencies
npm install
Start the frontend development server
npm run dev
Access the App
Open your browser and go to:
http://localhost:5173

📌 How It Works
Upload your PDF file through the React frontend
The backend processes and sends the PDF content to Google’s AI API
The summarized text is returned and displayed on a React summary card component
🔮 Future Improvements
Add user authentication (login/signup)
Support for multiple languages
UI enhancements with Material-UI or Tailwind CSS
Download summarized content as a text file
🤝 Contributing
Feel free to fork the repository and submit a pull request to suggest improvements or fix bugs!

📄 License
This project is licensed under the MIT License.

