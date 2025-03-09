AI-Powered PDF Summary App
A web application that allows users to upload PDF files and receive concise summaries powered by Google's AI API. The summarized content appears neatly on a React component.

🚀 Features
Upload PDF files directly from your device
AI-generated summaries of PDF content
Clean React frontend styled with regular CSS
Backend powered by Node.js and Express
Secure file handling and uploads
🗂️ Project Structure
This project is organized into two main folders:

backend – Contains the server-side code built with Node.js and Express
frontend – Contains the React application
Inside each, you'll find files like package.json, source folders, and configuration files.

🛠️ Technologies Used
Frontend
React
Vite
CSS (no external styling libraries)
Backend
Node.js
Express.js
Multer (for file uploads)
Google AI API (for summaries)
📥 How to Run the Project Locally
Running the Backend
Open your terminal and navigate to the backend folder.
Install the required dependencies by running npm install.
Once installed, start the backend server by running node server.js.
The backend server will now be running and ready to handle file uploads and communication with the AI API.

Running the Frontend
Open a new terminal window and go to the frontend folder.
Install the frontend dependencies by running npm install.
Start the frontend development server by running npm run dev.
You can now open your browser and visit http://localhost:5173 to use the app.

📌 How It Works
Upload a PDF file through the upload form in the React frontend.
The backend (Node.js) processes the upload and extracts the content.
That content is sent to Google's AI API to generate a summary.
The summary is sent back and displayed on a summary card in the React app.
🔮 Future Improvements
Add user authentication for login and signup
Support multiple languages
Improve the UI with a modern component library (like Material-UI or Tailwind CSS)
Provide an option to download the summarized content as a text file
🤝 Contributing
Feel free to fork this repository and submit pull requests with suggestions or improvements!

📄 License
This project is licensed under the MIT License.
