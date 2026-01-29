const API_URL = "http://localhost:5000";

function adminLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  if (email === "admin@gmail.com" && password === "admin123") {
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid admin credentials");
  }
}

async function loadStudents() {
  try {
    const response = await fetch(`${API_URL}/students`);
    const students = await response.json();
    let rows = "";

    students.forEach((s) => {
      rows += `
        <tr>
          <td style="padding: 20px;">
            <div style="font-weight: 600;">${s.name}</div>
            <div style="font-size: 12px; color: var(--text-dim);">${s.email}</div>
          </td>
          <td>${s.college}</td>
          <td>${s.domain}</td>
          <td>
            <span class="status-badge ${s.status === 'Approved' ? 'status-approved' : 'status-pending'}">
              ${s.status}
            </span>
          </td>
          <td>
            ${s.status === "Pending" 
              ? `<button class="btn btn-primary" style="padding: 8px 16px; width: auto;" onclick="approve('${s._id}')">Approve</button>` 
              : "✅"}
          </td>
        </tr>
      `;
    });
    document.getElementById("table").innerHTML = rows;
  } catch (err) {
    console.error("Failed to load students:", err);
  }
}

async function approve(id) {
  try {
    const response = await fetch(`${API_URL}/approve/${id}`, { 
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    });
    
    if (response.ok) {
      alert("Student Approved Successfully!");
      loadStudents(); 
    } else {
      alert("Approval failed on server.");
    }
  } catch (err) {
    console.error("Approval error:", err);
  }
}