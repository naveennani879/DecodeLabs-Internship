/**
 * StudentHub — B.Tech CSE Student Dashboard
 * Human-written, clean, modular JavaScript logic.
 */

// ========== STATE & MOCK DATA ==========
const dashboardState = {
  student: {
    name: "Naveen",
    program: "B.Tech Computer Science & Engineering",
    semester: "Semester 6",
    rollNumber: "CSE2023089",
    gpa: "8.92", // out of 10 for B.Tech
    gpaChange: "+0.15 this semester",
    attendancePct: 92,
    totalClasses: 250,
    presentClasses: 230,
    absentClasses: 20
  },
  
  // CSE Specific subjects
  subjects: [
    { id: "cs-301", name: "Data Structures & Algorithms", category: "Core Theory", marks: 88, maxMarks: 100, attendance: 95, code: "CS301", grade: "A+", status: "Pass" },
    { id: "cs-302", name: "Database Management Systems", category: "Core Theory", marks: 82, maxMarks: 100, attendance: 90, code: "CS302", grade: "A", status: "Pass" },
    { id: "cs-303", name: "Operating Systems", category: "Core Theory", marks: 78, maxMarks: 100, attendance: 88, code: "CS303", grade: "B+", status: "Pass" },
    { id: "cs-304", name: "Theory of Computation", category: "Theoretical CSE", marks: 91, maxMarks: 100, attendance: 96, code: "CS304", grade: "O", status: "Pass" },
    { id: "cs-305", name: "Software Engineering Lab", category: "Practical", marks: 95, maxMarks: 100, attendance: 92, code: "CS305", grade: "O", status: "Pass" },
    { id: "cs-306", name: "Artificial Intelligence", category: "Elective", marks: 85, maxMarks: 100, attendance: 91, code: "CS306", grade: "A", status: "Pass" }
  ],

  // Upcoming Semester exams
  exams: [
    { id: 1, subject: "Operating Systems (CS303)", date: "11", month: "Jun", time: "10:00 AM", hall: "Lab 3" },
    { id: 2, subject: "Database Management Systems (CS302)", date: "15", month: "Jun", time: "10:00 AM", hall: "LH-201" },
    { id: 3, subject: "Artificial Intelligence (CS306)", date: "18", month: "Jun", time: "02:00 PM", hall: "LH-204" }
  ],

  // Assignment / Task List
  assignments: [
    { id: 1, title: "Implement Red-Black Tree in C++", subject: "Data Structures & Algorithms", due: "2026-06-12", priority: "high", completed: false },
    { id: 2, title: "DBMS Project Schema Design", subject: "Database Management Systems", due: "2026-06-14", priority: "medium", completed: false },
    { id: 3, title: "Virtual Memory Simulation Script", subject: "Operating Systems", due: "2026-06-20", priority: "low", completed: true },
    { id: 4, title: "AI Neural Network from Scratch", subject: "Artificial Intelligence", due: "2026-06-25", priority: "high", completed: false }
  ],

  // Feed logs
  activities: [
    { id: 1, type: "grade", text: "Scored 92% in DSA Quiz 2", time: "2 hours ago", color: "dot-blue" },
    { id: 2, type: "assignment", text: "Submitted DBMS Assignment 3", time: "Yesterday", color: "dot-green" },
    { id: 3, type: "attendance", text: "Marked present in Operating Systems", time: "Yesterday", color: "dot-purple" },
    { id: 4, type: "note", text: "Added note: 'Review AI heuristic search proofs'", time: "2 days ago", color: "dot-yellow" }
  ],

  notes: [
    "Professor Miller's office hours: Thu 4-6 PM",
    "Bring laptop for DBMS lab tomorrow",
    "Prepare slides for Software Engineering presentation"
  ]
};

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
  initUI();
  setupEventListeners();
});

// ========== UI RENDERING ==========
function initUI() {
  // Update Profile Text
  document.getElementById("sidebarName").textContent = dashboardState.student.name;
  document.getElementById("studentFirstName").textContent = dashboardState.student.name.split(" ")[0];
  document.getElementById("welcomeSubtext").textContent = `Here's a quick summary of your performance in ${dashboardState.student.program} (${dashboardState.student.semester}).`;
  
  // Dashboard values
  document.getElementById("gpaValue").textContent = `${dashboardState.student.gpa} CGPA`;
  document.getElementById("attendanceValue").textContent = `${dashboardState.student.attendancePct}%`;
  updatePendingCount();

  // Draw sections contents
  renderProgressList();
  renderExamList();
  renderActivityList();
  renderNotes();
  renderGradesTable();
  renderTimetable();
  renderAssignments();
  renderAttendanceDashboard();
}

// Update pending assignments counter dynamically
function updatePendingCount() {
  const pending = dashboardState.assignments.filter(a => !a.completed).length;
  document.getElementById("pendingValue").textContent = pending;
  
  // Update Exam countdown info dynamically based on first exam
  if (dashboardState.exams.length > 0) {
    const nextExam = dashboardState.exams[0];
    document.getElementById("nextExamValue").textContent = `${nextExam.date} ${nextExam.month}`;
    const cardExams = document.getElementById("card-exams");
    if (cardExams) {
      const changeText = cardExams.querySelector(".stat-change");
      changeText.textContent = `${nextExam.subject}`;
    }
  }
}

// Render Dashboard Subjects Progress
function renderProgressList() {
  const list = document.getElementById("progressList");
  if (!list) return;
  list.innerHTML = "";
  
  dashboardState.subjects.forEach(sub => {
    const color = getProgressColor(sub.marks);
    const item = document.createElement("div");
    item.className = "progress-item";
    item.innerHTML = `
      <div class="progress-top">
        <span class="progress-subject">${sub.name}</span>
        <span class="progress-pct">${sub.marks}%</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${sub.marks}%; background-color: ${color};"></div>
      </div>
    `;
    list.appendChild(item);
  });
}

function getProgressColor(marks) {
  if (marks >= 85) return "var(--clr-green)";
  if (marks >= 75) return "var(--clr-blue)";
  if (marks >= 60) return "var(--clr-yellow)";
  return "var(--clr-red)";
}

// Render Upcoming Exams on Dashboard
function renderExamList() {
  const list = document.getElementById("examList");
  if (!list) return;
  list.innerHTML = "";
  
  dashboardState.exams.slice(0, 3).forEach(exam => {
    const item = document.createElement("li");
    item.className = "exam-item";
    item.innerHTML = `
      <div class="exam-date-box">
        <span class="day">${exam.date}</span>
        <span class="month">${exam.month}</span>
      </div>
      <div class="exam-info">
        <p class="exam-name">${exam.subject}</p>
        <p class="exam-room">Time: ${exam.time} | Room: ${exam.hall}</p>
      </div>
      <span class="exam-tag">Theory</span>
    `;
    list.appendChild(item);
  });
}

// Render Activities
function renderActivityList() {
  const list = document.getElementById("activityList");
  if (!list) return;
  list.innerHTML = "";

  dashboardState.activities.forEach(act => {
    const item = document.createElement("li");
    item.className = "activity-item";
    item.innerHTML = `
      <div class="activity-dot ${act.color}"></div>
      <div class="activity-text">${act.text}</div>
      <div class="activity-time">${act.time}</div>
    `;
    list.appendChild(item);
  });
}

// Render Notes
function renderNotes() {
  const notesArea = document.getElementById("notesArea");
  if (!notesArea) return;
  notesArea.innerHTML = "";

  if (dashboardState.notes.length === 0) {
    notesArea.innerHTML = `<p class="text-muted" style="font-size: 13px; text-align:center; padding: 20px 0;">No notes added yet.</p>`;
    return;
  }

  dashboardState.notes.forEach((note, index) => {
    const chip = document.createElement("div");
    chip.className = "note-chip";
    chip.innerHTML = `
      <span>${note}</span>
      <button class="note-del" onclick="deleteNote(${index})">&times;</button>
    `;
    notesArea.appendChild(chip);
  });
}

// Note actions
function deleteNote(index) {
  const deletedText = dashboardState.notes[index];
  dashboardState.notes.splice(index, 1);
  renderNotes();
  showToast("Note deleted", "info");
  
  // Log activity
  dashboardState.activities.unshift({
    id: Date.now(),
    type: "note",
    text: `Deleted note: "${deletedText.substring(0, 20)}..."`,
    time: "Just now",
    color: "dot-red"
  });
  renderActivityList();
}

// Render Grades Table with dynamic coloring & filters
function renderGradesTable(filterCategory = "all") {
  const tbody = document.getElementById("gradesBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  let filtered = dashboardState.subjects;
  if (filterCategory !== "all") {
    filtered = dashboardState.subjects.filter(sub => {
      const cat = sub.category.toLowerCase();
      const subName = sub.name.toLowerCase();
      if (filterCategory === "science") return cat.includes("theory") || subName.includes("database") || subName.includes("artificial");
      if (filterCategory === "math") return subName.includes("structures") || subName.includes("theory of computation");
      if (filterCategory === "language") return cat.includes("practical") || cat.includes("elective");
      return true;
    });
  }

  filtered.forEach(sub => {
    const gradeClass = sub.grade.startsWith("O") || sub.grade.startsWith("A") ? "grade-a" : (sub.grade.startsWith("B") ? "grade-b" : "grade-c");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight: 600;">${sub.name} <span class="text-muted" style="font-size: 12px; font-weight: 400; display:block;">${sub.code}</span></td>
      <td><span class="cat-tag">${sub.category}</span></td>
      <td>${sub.marks}</td>
      <td>${sub.maxMarks}</td>
      <td style="font-weight: 600;">${((sub.marks / sub.maxMarks) * 100).toFixed(0)}%</td>
      <td><span class="grade-pill ${gradeClass}">${sub.grade}</span></td>
      <td><span class="status-pass">Pass</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Weekly Timetable
function renderTimetable() {
  const grid = document.getElementById("timetableGrid");
  if (!grid) return;
  grid.innerHTML = "";

  // Days and slots
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const slots = [
    { time: "09:00 - 10:30", subjects: ["DS & Algo", "DBMS", "Operating Sys", "AI Elective", "Theory of Comp"] },
    { time: "10:30 - 10:45", break: true, label: "Short Break" },
    { time: "10:45 - 12:15", subjects: ["DBMS", "Operating Sys", "Theory of Comp", "DS & Algo", "Software Eng Lab"] },
    { time: "12:15 - 01:15", break: true, label: "Lunch Break" },
    { time: "01:15 - 02:45", subjects: ["Artificial Intel", "Software Eng Lab", "DS & Algo Lab", "DBMS Lab", "Seminar Room"] }
  ];

  // Draw Headers: [Time / Days...]
  const headerTime = document.createElement("div");
  headerTime.className = "tg-cell tg-header tg-time";
  headerTime.textContent = "Time";
  grid.appendChild(headerTime);

  days.forEach(day => {
    const header = document.createElement("div");
    header.className = "tg-cell tg-header";
    header.textContent = day;
    grid.appendChild(header);
  });

  // Render rows
  slots.forEach(slot => {
    if (slot.break) {
      const breakCell = document.createElement("div");
      breakCell.className = "tg-cell tg-break";
      breakCell.style.gridColumn = "span 6";
      breakCell.textContent = `${slot.time} — ${slot.label}`;
      grid.appendChild(breakCell);
    } else {
      // Time label cell
      const timeCell = document.createElement("div");
      timeCell.className = "tg-cell tg-time";
      timeCell.textContent = slot.time;
      grid.appendChild(timeCell);

      // Subject cells for each day
      slot.subjects.forEach((subName, index) => {
        const subCell = document.createElement("div");
        subCell.className = "tg-cell tg-subject";
        
        let room = "Room 402";
        if (subName.includes("Lab")) room = "CSE Lab 2";
        if (subName.includes("Seminar")) room = "LH-102";

        subCell.innerHTML = `
          <span class="tg-subject-name">${subName}</span>
          <span class="tg-subject-room">${room}</span>
        `;
        grid.appendChild(subCell);
      });
    }
  });

  // Render Exam Calendar below it
  const list = document.getElementById("examScheduleList");
  if (!list) return;
  list.innerHTML = "";
  
  dashboardState.exams.forEach(exam => {
    const item = document.createElement("li");
    item.className = "exam-sch-item";
    item.innerHTML = `
      <div class="exam-sch-date">${exam.date} ${exam.month}</div>
      <div class="exam-sch-subject">${exam.subject}</div>
      <div class="exam-sch-time">${exam.time}</div>
      <div class="exam-sch-hall">${exam.hall}</div>
    `;
    list.appendChild(item);
  });
}

// Render Assignments/Task list
function renderAssignments(filter = "all") {
  const list = document.getElementById("assignmentList");
  if (!list) return;
  list.innerHTML = "";

  let filtered = dashboardState.assignments;
  if (filter === "pending") filtered = dashboardState.assignments.filter(a => !a.completed);
  if (filter === "completed") filtered = dashboardState.assignments.filter(a => a.completed);

  if (filtered.length === 0) {
    list.innerHTML = `<div class="card" style="text-align: center; padding: 40px; color: var(--clr-text-muted);">No assignments found.</div>`;
    return;
  }

  filtered.forEach(assign => {
    const card = document.createElement("div");
    card.className = `assign-card ${assign.completed ? 'completed' : ''}`;
    
    // Formatting Due dates beautifully
    const dueDate = new Date(assign.due);
    const day = dueDate.getDate();
    const month = dueDate.toLocaleString('default', { month: 'short' });
    
    card.innerHTML = `
      <div class="assign-check">
        <input type="checkbox" id="chk-${assign.id}" ${assign.completed ? 'checked' : ''} onchange="toggleAssignment(${assign.id})" />
        <label for="chk-${assign.id}"></label>
      </div>
      <div class="assign-info">
        <h4 class="assign-title">${assign.title}</h4>
        <p class="assign-meta">${assign.subject}</p>
      </div>
      <span class="assign-priority priority-${assign.priority}">${assign.priority}</span>
      <div class="assign-due">
        <span class="due-label">DUE BY</span>
        <div style="font-weight: 700; margin-top:2px;">${day} ${month}</div>
      </div>
      <button class="assign-del" onclick="deleteAssignment(${assign.id})">&#128465;</button>
    `;
    list.appendChild(card);
  });
}

// Assignment Actions
function toggleAssignment(id) {
  const assign = dashboardState.assignments.find(a => a.id === id);
  if (!assign) return;
  
  assign.completed = !assign.completed;
  renderAssignments();
  updatePendingCount();
  
  const statusStr = assign.completed ? "completed" : "reopened";
  showToast(`Assignment ${statusStr}!`, "success");
  
  // Log activity
  dashboardState.activities.unshift({
    id: Date.now(),
    type: "assignment",
    text: `${assign.completed ? 'Completed' : 'Reopened'} task: ${assign.title}`,
    time: "Just now",
    color: assign.completed ? "dot-green" : "dot-yellow"
  });
  renderActivityList();
}

function deleteAssignment(id) {
  const index = dashboardState.assignments.findIndex(a => a.id === id);
  if (index === -1) return;
  
  const title = dashboardState.assignments[index].title;
  dashboardState.assignments.splice(index, 1);
  renderAssignments();
  updatePendingCount();
  showToast("Task deleted", "info");

  // Log activity
  dashboardState.activities.unshift({
    id: Date.now(),
    type: "assignment",
    text: `Deleted task: ${title}`,
    time: "Just now",
    color: "dot-red"
  });
  renderActivityList();
}

// Draw Attendance HTML elements & render local Donut chart via Canvas APIs
function renderAttendanceDashboard() {
  const s = dashboardState.student;
  document.getElementById("attendPct").textContent = `${s.attendancePct}%`;
  document.getElementById("daysPresent").textContent = s.presentClasses;
  document.getElementById("daysAbsent").textContent = s.absentClasses;
  document.getElementById("totalDays").textContent = s.totalClasses;

  // Custom high performance canvas rendering for Attendance Ring
  const canvas = document.getElementById("attendanceChart");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 70;
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background track ring
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e2e8f0"; // --clr-border in CSS light theme
    ctx.lineWidth = 14;
    ctx.stroke();
    
    // Value ring
    const startAngle = -0.5 * Math.PI;
    const endAngle = startAngle + (s.attendancePct / 100) * 2 * Math.PI;
    
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.strokeStyle = "#16a34a"; // --clr-green in CSS light theme
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  // Subject attendance details
  const list = document.getElementById("attendSubjectList");
  if (!list) return;
  list.innerHTML = "";

  dashboardState.subjects.forEach(sub => {
    const color = sub.attendance >= 90 ? "var(--clr-green)" : (sub.attendance >= 80 ? "var(--clr-blue)" : "var(--clr-yellow)");
    const item = document.createElement("div");
    item.className = "attend-sub-item";
    item.innerHTML = `
      <div class="attend-sub-top">
        <span class="attend-sub-name">${sub.name}</span>
        <span class="attend-sub-pct" style="color: ${color};">${sub.attendance}%</span>
      </div>
      <div class="attend-bar-bg">
        <div class="attend-bar-fill" style="width: ${sub.attendance}%; background-color: ${color};"></div>
      </div>
    `;
    list.appendChild(item);
  });
}

// ========== GLOBAL ACTIONS & EVENTS ==========
function setupEventListeners() {
  // Mobile navigation
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const sidebarClose = document.getElementById("sidebarClose");
  const overlay = document.getElementById("overlay");

  const openSidebar = () => {
    sidebar.classList.add("open");
    overlay.classList.add("visible");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
  };

  if (hamburger) hamburger.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // Tab switching links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");
      switchSection(target);
      closeSidebar();
    });
  });

  // Quick Notes toggle and Save
  const addNoteBtn = document.getElementById("addNoteBtn");
  const noteInputRow = document.getElementById("noteInputRow");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteInput = document.getElementById("noteInput");

  if (addNoteBtn && noteInputRow) {
    addNoteBtn.addEventListener("click", () => {
      const isHidden = noteInputRow.style.display === "none";
      noteInputRow.style.display = isHidden ? "flex" : "none";
      if (isHidden) noteInput.focus();
    });
  }

  if (saveNoteBtn && noteInput) {
    const handleAddNote = () => {
      const text = noteInput.value.trim();
      if (!text) return;

      dashboardState.notes.push(text);
      renderNotes();
      noteInput.value = "";
      noteInputRow.style.display = "none";
      showToast("Note added successfully", "success");

      // Log activity
      dashboardState.activities.unshift({
        id: Date.now(),
        type: "note",
        text: `Added note: "${text}"`,
        time: "Just now",
        color: "dot-yellow"
      });
      renderActivityList();
    };

    saveNoteBtn.addEventListener("click", handleAddNote);
    noteInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleAddNote();
    });
  }

  // Grades table filtering
  document.querySelectorAll(".grades-filters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".grades-filters .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderGradesTable(filter);
    });
  });

  // Assignments filter tabs
  document.querySelectorAll(".assign-filters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".assign-filters .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-assign-filter");
      renderAssignments(filter);
    });
  });

  // Assignment Modal
  const addAssignBtn = document.getElementById("addAssignBtn");
  const assignModal = document.getElementById("assignModal");
  const closeAssignModal = document.getElementById("closeAssignModal");
  const cancelAssignBtn = document.getElementById("cancelAssignBtn");
  const saveAssignBtn = document.getElementById("saveAssignBtn");

  const openModal = () => assignModal.classList.add("open");
  const closeModal = () => {
    assignModal.classList.remove("open");
    // clear fields
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskSubject").value = "";
    document.getElementById("taskDue").value = "";
    document.getElementById("taskPriority").value = "medium";
  };

  if (addAssignBtn) addAssignBtn.addEventListener("click", openModal);
  if (closeAssignModal) closeAssignModal.addEventListener("click", closeModal);
  if (cancelAssignBtn) cancelAssignBtn.addEventListener("click", closeModal);
  
  if (saveAssignBtn) {
    saveAssignBtn.addEventListener("click", () => {
      const title = document.getElementById("taskTitle").value.trim();
      const subject = document.getElementById("taskSubject").value.trim();
      const due = document.getElementById("taskDue").value;
      const priority = document.getElementById("taskPriority").value;

      if (!title || !subject || !due) {
        showToast("Please fill in all task details!", "error");
        return;
      }

      const newTask = {
        id: Date.now(),
        title,
        subject,
        due,
        priority,
        completed: false
      };

      dashboardState.assignments.push(newTask);
      renderAssignments();
      updatePendingCount();
      closeModal();
      showToast("New task created!", "success");

      // Log activity
      dashboardState.activities.unshift({
        id: Date.now(),
        type: "assignment",
        text: `Created task: ${title}`,
        time: "Just now",
        color: "dot-blue"
      });
      renderActivityList();
    });
  }

  // Global Search bar logic
  const searchInput = document.getElementById("globalSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        renderAssignments();
        renderGradesTable();
        return;
      }
      
      // Filter assignments containing search query
      const filteredAssigns = dashboardState.assignments.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.subject.toLowerCase().includes(query)
      );
      
      const list = document.getElementById("assignmentList");
      if (list) {
        list.innerHTML = "";
        if (filteredAssigns.length === 0) {
          list.innerHTML = `<div class="card" style="text-align: center; padding: 20px; color: var(--clr-text-muted);">No matching assignments.</div>`;
        } else {
          filteredAssigns.forEach(assign => {
            const card = document.createElement("div");
            card.className = `assign-card ${assign.completed ? 'completed' : ''}`;
            card.innerHTML = `
              <div class="assign-check">
                <input type="checkbox" id="chk-${assign.id}" ${assign.completed ? 'checked' : ''} onchange="toggleAssignment(${assign.id})" />
                <label for="chk-${assign.id}"></label>
              </div>
              <div class="assign-info">
                <h4 class="assign-title">${assign.title}</h4>
                <p class="assign-meta">${assign.subject}</p>
              </div>
              <span class="assign-priority priority-${assign.priority}">${assign.priority}</span>
              <div class="assign-due">
                <span class="due-label">DUE BY</span>
                <div>${assign.due}</div>
              </div>
            `;
            list.appendChild(card);
          });
        }
      }
    });
  }
}

// ========== UTILS & NAVIGATION ==========
function switchSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  
  // Show target section
  const target = document.getElementById(`section-${sectionId}`);
  if (target) target.classList.add("active");

  // Update navbar links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-section") === sectionId) {
      link.classList.add("active");
    }
  });

  // Update title in topbar
  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) {
    const formattedTitle = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
    pageTitle.textContent = formattedTitle === "Dashboard" ? "Dashboard" : `My ${formattedTitle}`;
  }

  // Scroll to top
  window.scrollTo({ top: 0 });
}

// Toast notification helper
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "&#10003;"; // checkmark
  if (type === "error") icon = "&#9888;"; // warning sign
  if (type === "info") icon = "&#8505;"; // information symbol

  toast.innerHTML = `
    <span>${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
