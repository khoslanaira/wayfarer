# 🛡️ Sentinel Wayfarer: The Self-Healing Experience Engine

> **Built for the Google PromptWars Main Challenge**

Traditional travel itineraries are static and brittle. If it rains, or if a primary attraction is closed, the itinerary breaks and leaves the user stranded. 

**Sentinel Wayfarer** treats a travel itinerary like a High-Availability server architecture. It is an agentic, "Self-Healing" travel engine powered by Gemini 1.5 Flash. When the real world introduces a constraint (Chaos), the system acts autonomously to "hot-patch" the schedule in real-time, completely without user intervention.

## 🚀 The "PromptWars" Wow Factor

This project was engineered to demonstrate advanced **Agentic Workflows** rather than basic chatbot interactions:

1. **Structured Data Patching:** The Sentinel Watchdog Agent doesn't just generate text. It ingests complex JSON, applies highly specific constraint logic (e.g., *"Change only the outdoor activity"*), and returns a patched JSON string to dynamically update the React state.
2. **Tactical Holographic HUD:** The UI is an Ultra-Premium "Mission Control" interface built with Framer Motion. 
3. **Dynamic Visual States:** 
   - **Optimal:** Itinerary nodes pulse with a Cyber Lime glow and display a `STATUS: OPERATIONAL` badge.
   - **Chaos Injection:** Simulating real-world constraints drops the system uptime, turns the viewport red, and visually glitches affected itinerary nodes (`SYSTEM ERROR`).
   - **Self-Healing:** The card flips via a 3D animation to reveal the newly patched activity provided by Gemini.

## 🛠️ Tech Stack & Architecture

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS (Custom Dark Theme with Glassmorphism)
- **Animations:** Framer Motion
- **AI Engine:** Google Generative AI SDK (`@google/generative-ai` with `gemini-flash-latest`)
- **Deployment:** Dockerized with Nginx multi-stage build (Prepared for Google Cloud Run)

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khoslanaira/wayfarer.git
   cd wayfarer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the local engine:**
   ```bash
   npm run dev
   ```

## ☁️ Google Cloud Run Deployment

This project is configured out-of-the-box for Google Cloud Run.

1. Navigate to Google Cloud Console > Cloud Run.
2. Select **Continuously deploy from a repository**.
3. Link this GitHub repository.
4. Set the Build Type to **Dockerfile**.
5. Add `VITE_GEMINI_API_KEY` as an environment variable.
6. Click **Deploy**.
