


**Core Concept:** A backend service that fetches news from RSS feeds and saves it to a simple file. A separate frontend web application then reads this file and displays the news, neatly categorized.

**Tech Stack (The Simple & Solid Starter Kit):**

- **Backend:** Node.js, Express.js, JavaScript (ES6+)
- **Frontend:** React.js (with Vite), JavaScript (JSX)
- **Database:** A simple `db.json` file (perfect for a first project and avoids database setup complexity)
- **Tooling:** Postman (for API testing), node-cron (for scheduling), axios (for fetching)

---

**Phase 0: The Blueprint & Foundation (Setup)**

*This phase is about preparing our workshop. A clean setup prevents 90% of future problems.*

1. **Install Your Core Tools:**

   - Node.js: Ensure it's installed on your machine.

   - VS Code: Your code editor.

   - Git & GitHub: Create a new, public repository on GitHub called `project-sentinel`. This is your project's home and public record.

   - Postman: To test our backend API before we even have a frontend.

2. **Create the Project Structure:**

   - This two-folder structure (monorepo style) is professional and keeps your backend and frontend code separate and organized.

   ```
   /project-sentinel
     ├── /backend      <-- Our Node.js API will live here
     └── /frontend     <-- Our React app will live here
   ```

3. **Set Up the Backend:**

   - Navigate into the backend folder: `cd backend`

   - [👉 AI Prompt]: *"Initialize a new Node.js project and install the following dependencies: express, axios, rss-parser, node-cron, and cors."*

     - express: Our web server framework.

     - axios / rss-parser: For fetching and parsing news.

     - node-cron: To run our script automatically.

     - cors: Crucial. Allows our frontend (on a different port) to talk to our backend.

4. **Set Up the Frontend:**

   - Navigate to the root `project-sentinel` folder.

   - [👉 AI Prompt]: *"Create a new React project inside the frontend folder using Vite and the 'react' template. After it's created, navigate into the new frontend directory and install axios."*

---

**Phase 1: The Core Engine (Backend Script)**

*Goal: Prove we can fetch and categorize news. No server yet, just a script.*

1. **Create Your News Sources:**

   - In the backend folder, create a file named `sources.js`.

   - [👉 AI Prompt]: *"In sources.js, create and export a JavaScript object named sources. The keys should be category names like 'Technology' and 'World News'. The values should be arrays of RSS feed URLs for that category. Find one or two URLs for each category to start."*

2. **Build the Fetcher Script:**

   - In the backend folder, create a file named `fetcher.js`.

   - [👉 AI Prompt]: *"In fetcher.js, write an async function called fetchAllArticles. This function should: Import the sources object from sources.js and the rss-parser library. Create an empty object categorizedArticles. Loop through each category in the sources object. For each category, fetch and parse the articles from its RSS feed URLs. Add the fetched articles to the categorizedArticles object under the correct category key. Each article object should contain title, link, and pubDate. Finally, console.log the categorizedArticles object to see the result."*

   - **Test It:** Run `node backend/fetcher.js` in your terminal. You should see a big block of text containing your categorized news. Victory! The core logic is sound.

---

**Phase 2: Building the API (Serving the Data)**

*Goal: Turn our script into a real API that the frontend can call.*

1. **Create the Server:**

   - In the backend folder, create `server.js`.

   - [👉 AI Prompt]: *"In server.js, create a basic Express.js server that listens on port 3001. It should use the cors middleware. Create a single GET route at / that responds with a JSON message: { message: 'API is running' }."*

   - **Test It:** Run `node backend/server.js` and visit http://localhost:3001 in your browser. You should see the message.

2. **Create the "Database":**

   - Create a file in backend named `db.json`.

   - [👉 AI Prompt]: *"Populate db.json with a simple JSON structure: { 'Technology': [], 'World News': [] }."*

3. **Combine Fetching & Saving:**

   - Modify your `fetcher.js` script.

   - [👉 AI Prompt]: *"Modify the fetchAllArticles function in fetcher.js. Instead of console.logging the articles at the end, it should use Node's built-in fs/promises module to write the categorizedArticles object to the db.json file, overwriting it each time."*

4. **Automate the Fetch:**

   - Modify `server.js`.

   - [👉 AI Prompt]: *"In server.js, import node-cron and the fetchAllArticles function from fetcher.js. Schedule fetchAllArticles to run once every 10 minutes using cron.schedule. Also, call fetchAllArticles() one time right when the server starts."*

5. **Create the API Endpoint:**

   - [👉 AI Prompt]: *"In server.js, create a new GET route at /api/articles. When this route is requested, it should read the contents of db.json, parse it, and send the resulting JSON object back to the client as the response."*

   - **Test It:** Restart your server (`node backend/server.js`). Open Postman and make a GET request to http://localhost:3001/api/articles. You should receive the categorized news in the response body.

The backend is now complete for our MVP. It automatically fetches news and serves it on demand.

---

**Phase 3: Building the User Interface (Frontend)**

*Goal: Create a simple web page to display the news fetched from our API.*

1. **Prepare the React App:**

   - Go to your frontend directory. Open `src/App.jsx`.

   - [👉 AI Prompt]: *"In App.jsx, clean up the file. Remove the default boilerplate code. Return a simple div containing an h1 that says 'Project Sentinel News'."*

2. **Fetch Data from the Backend:**

   - [👉 AI Prompt]: *"In App.jsx, use the useState and useEffect hooks. Create a piece of state called articles initialized to an empty object {}. In a useEffect hook, use axios to make a GET request to your backend's API endpoint (http://localhost:3001/api/articles). When the data is received, update the articles state with the response data."*

3. **Display the Data:**

   - [👉 AI Prompt]: *"In the return statement of App.jsx, below the h1: Use Object.keys() to map over the articles state object. For each category key, render an h2 with the category name. Inside each category section, map over the array of articles for that category. For each article, render a list item <li> containing an anchor tag <a> that has the article's title as text and its link as the href."*

4. **Final Test:**

   - Make sure your backend server is running in one terminal.

   - Run your frontend dev server (`npm run dev`) in the frontend directory.

   - Open the browser to the provided localhost address for the frontend. You should see your categorized list of news articles.

---

**Phase 4: The Path Forward (Future Upgrades)**

You now have a fully functional, end-to-end web application. As your lead developer, I'd now recommend the following professional upgrades when you're ready:

- **Upgrade the Database:** Replace the db.json file with a real MongoDB database and use Mongoose to define a schema for your articles. This is the #1 next step to make it a true MERN stack app.

- **Add a "Loading" State:** Show a spinner or "Loading news..." message on the frontend while axios is fetching data.

- **Improve the UI:** Use a simple component library like Chakra UI to make the frontend look more professional without writing a lot of CSS.

- **Dockerize It:** Create a Dockerfile for your backend. This is a huge skill for placements.

- **Deploy It:** Deploy your backend to Render and your frontend to Vercel so you can share a live URL with anyone.

---

Follow this plan, and you will not only learn an immense amount but also have an impressive, working project for your portfolio. Let's get building.