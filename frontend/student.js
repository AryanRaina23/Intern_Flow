const API_URL = "http://localhost:5000";

async function registerStudent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const college = document.getElementById("college").value;
  const domain = document.getElementById("domain").value;

  if (!name || !email || !password || !college || !domain) {
    return alert("Please fill in all fields.");
  }

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, college, domain })
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.href = "student-login.html";
  } catch (error) {
    console.error("Registration Error:", error);
    alert("Server connection failed.");
  }
}

async function loginStudent() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    if (data.success) {
      
      localStorage.setItem("loggedStudent", JSON.stringify(data.user));
      window.location.href = "student-dashboard.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Check if your backend server is running.");
  }
}