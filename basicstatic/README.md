# StudentHub — Professional Student Dashboard

A clean, high-performance, and responsive student portal dashboard designed for **B.Tech Computer Science & Engineering** students. Built with vanilla HTML5, modern CSS custom properties, and modular JavaScript without heavy framework overhead.

## 🌟 Key Features

*   **Responsive Side Navigation**: Full sidebar navigation collapsing into a mobile slide-out drawer via a hamburger toggle.
*   **Dynamic Sections**: Seamlessly switch tabs between:
    *   **Dashboard**: Overview of GPA, attendance, next exam countdown, class performance progress bars, recent activity logger, and sticky notes.
    *   **My Grades**: A tabular view of grade metrics (category, percentage, and grade status) with interactive domain filters (Science, Math, Programming Electives).
    *   **Schedule**: Interactive grid-based weekly timetable with break hours and detailed exam classrooms.
    *   **Assignments**: Interactive task manager to add, complete, search, filter, and delete tasks dynamically.
    *   **Attendance**: Real-time attendance ring rendered with local high-performance HTML5 Canvas APIs, alongside subject-wise percentage breakdowns.
*   **Sticky Note Area**: Create and delete personal quick notes with state stored instantly.
*   **Live Search**: Search assignments and study tasks instantly using the top bar.
*   **Interactive Toast Notifications**: Action feedback messages for creation, completion, and deletion events.

## 🛠️ Technology Stack & Styling

1.  **HTML5**: Clean, semantic structure with descriptive header, aside, main, and section tags.
2.  **CSS3 (Vanilla)**: Designed around modern CSS variables (Design Tokens) for quick palette adjustments. Includes:
    *   Dark theme configuration (`#0f1117` background with surface panels).
    *   Hover actions and interactive scales.
    *   Smooth entry transition animations (`@keyframes fadeUp` & `slideIn`).
3.  **JavaScript (ES6+)**: Clean, state-driven model containing mockup data for B.Tech CSE subjects (Data Structures, DBMS, OS, AI, Theory of Computation).

## 📁 File Structure

```text
├── index.html   # Main dashboard structure & layout
├── style.css    # Responsive styling & theme design tokens
├── app.js       # Dynamic UI rendering, State management & Event listeners
└── README.md    # Documentation & setup instructions
```

## 🚀 Quick Setup & Run

1. Clone or copy these files into a local folder on your computer.
2. Open `index.html` directly in any web browser, or serve it using a lightweight dev server (such as VS Code's Live Server extension).
3. No configuration, compilation, or compilation dependencies required! Fully client-side.
