// Minimal Authentication - Fast and Simple
(function () {
  "use strict";

  // Simple session check
  window.checkAuth = function () {
    const session = sessionStorage.getItem("tailor_session");
    if (!session) {
      if (!window.location.pathname.includes("login.html")) {
        window.location.href = "/login.html";
        return false;
      }
    }
    return true;
  };

  // Simple login
  window.doLogin = async function (username, password, code) {
    // Simple validation (you can enhance this)
    if (username === "admin" && password === "Admin123" && code === "123456") {
      sessionStorage.setItem(
        "tailor_session",
        JSON.stringify({
          user: username,
          time: Date.now(),
        })
      );
      return true;
    }
    return false;
  };

  // Simple logout
  window.logout = function () {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login.html";
  };

  // Only check auth on main pages
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname.includes("customer-profile.html")
  ) {
    // Give time for session to be created
    setTimeout(() => {
      checkAuth();
    }, 100);
  }

  // Handle login form
  if (window.location.pathname.includes("login.html")) {
    document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("loginForm");
      if (!form) return;

      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const code = document.getElementById("accessCode").value;

        if (await doLogin(username, password, code)) {
          document.getElementById("alertBox").innerHTML = "Login successful!";
          document.getElementById("alertBox").className = "alert alert-success";
          document.getElementById("alertBox").style.display = "block";

          setTimeout(() => {
            window.location.href = "/index.html";
          }, 1000);
        } else {
          document.getElementById("alertBox").innerHTML =
            "Invalid credentials!";
          document.getElementById("alertBox").className = "alert alert-error";
          document.getElementById("alertBox").style.display = "block";
        }
      });
    });
  }
})();
