Excellent question. Understanding what Postman is exactly used for is a critical step in becoming a developer. It's one of those tools that seems simple at first, but is incredibly powerful.

---

**Analogy:**

Imagine you are building a car engine (your backend API). You've assembled all the parts, and you think it works. How do you test it?

- **The Hard Way:** You build the entire car around it—the chassis, the wheels, the dashboard, the steering wheel (your frontend React app). Then you turn the key and hope the engine starts. If it doesn't, you have a huge problem. Is the problem the engine? The fuel line? The electronics? It's very difficult to figure out.

- **The Smart Way:** You put the engine on a special diagnostic stand. This stand has all the tools to start the engine, measure its power, check its fuel intake, and read all its sensor data directly. You can test the engine in complete isolation before it ever goes into a car.

**Postman is that diagnostic stand for your API.**

---

**What Postman Is**

- Postman is a specialized application that lets you manually send HTTP requests to an API and inspect the responses in extreme detail.
- It acts as a temporary, developer-focused "client" so you don't have to build a whole frontend application just to test if your backend is working correctly.

---

**How You Use Postman (With Your Project as an Example):**

Let's say you've just written the code for your `/api/articles` endpoint in `server.js`. Your server is running. You now need to know: "Did my code actually work?"

This is where you open Postman:

1. **Specify the destination (URL):** In the main Postman input field, you type the full URL of your API endpoint: `http://localhost:3001/api/articles`.
2. **Choose the method:** Your endpoint is designed to get data, so you select the `GET` method from the dropdown menu (other options are POST, PUT, DELETE, etc.).
3. **Hit "Send":** You click the big "Send" button. Postman now sends that exact GET request to your running backend server, just as a web browser or your React app would.
4. **Inspect the Response :**
   - **Body:** You will see the raw JSON data that your server sent back. You can immediately check: Is the data there? Is it formatted correctly? Are all the article titles and links present?
   - **Status Code:** Postman will show you the HTTP status code. `200 OK` means everything worked! If you see `404 Not Found`, you know you have a typo in your URL. If you see `500 Internal Server Error`, you know the code inside your Express route handler has crashed.
   - **Headers:** You can inspect all the HTTP headers, which is useful for debugging things like caching or Content-Type.
   - **Time:** It even tells you how long the request took to complete, helping you spot performance issues.

---

**The Core Problem Postman Solves: Isolation**

The single most important reason to use Postman is to isolate your backend from your frontend during development.

- If you get an error in Postman: You know with 100% certainty that the problem is in your backend code (your Express server, your fetching logic, etc.). You don't have to waste any time looking at your React code.
- If Postman works perfectly but your React app doesn't: You know with 100% certainty that the problem is in your frontend code (your axios call, your useState/useEffect logic, how you're rendering the data, etc.).

This separation saves you countless hours of confused debugging.

---

**Summary of Postman's Exact Uses:**

- **Backend Testing:** To confirm your API endpoints work as expected before writing any frontend code.
- **Debugging:** To pinpoint whether an issue is on the backend or frontend.
- **Sending Complex Requests:** To easily test POST or PUT requests that require sending a JSON body, which is very difficult to do from a browser bar.
- **API Exploration:** To interact with and learn from third-party APIs (like the GitHub API or a weather API) before you integrate them into your own application.
- **Documentation:** You can save your requests into "Collections" in Postman to create a library of tests for your API, which also serves as living documentation for other developers (or your future self).

---

For your project, Postman is not just recommended; it's an essential tool in your workshop. You will use it every single time you create or modify an API endpoint.