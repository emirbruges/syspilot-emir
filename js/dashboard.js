document.addEventListener("DOMContentLoaded", () => {
  let userPermissions = {
    // Default permissions for demonstration
    shutdown: true,
    restart: true,
    lock: true,
    play_pause: true,
    media_next: true,
    media_previous: true,
    volume: true,
    volume_mute: true,
    system_metrics: true,
    modify_commands: true,
    manage_users: true,
  };
  let currentOSType = "Linux"; // Assume Linux for demonstration

  // --- DOM Elements ---
  const logoutButton = document.getElementById("logout-button");
  const pageNotification = document.getElementById("page-notification");
  const volumeSlider = document.getElementById("volume-slider");
  const volumePercentage = document.getElementById("volume-percentage");
  const volumeMuteButton = document.getElementById("volume-mute-button");
  const cpuUsageSpan = document.getElementById("cpu-usage");
  const ramUsageSpan = document.getElementById("ram-usage");
  const uptimeSpan = document.getElementById("uptime");
  const welcomeMessage = document.getElementById("welcome-message");

  // Modals and their elements (dummy references for notification purposes)
  const userManagementModal = document.getElementById("user-management-modal");
  const customCommandsModal = document.getElementById("custom-commands-modal");
  const customAlertModal = document.getElementById("custom-alert-modal");
  const editUserModal = document.getElementById("edit-user-modal");

  const closeButtons = document.querySelectorAll(
    ".close-button, .close-button-nested, .close-button-alert",
  );
  const manageUsersButton = document.getElementById("manage-users-button");
  const manageCustomCommandsButton = document.getElementById(
    "manage-custom-commands-button",
  );

  // --- Utility Functions ---

  function showNotification(message, type = "info", duration = 3000) {
    pageNotification.textContent = message;
    pageNotification.className = "page-notification show " + type; // Reset classes and add type
    setTimeout(() => {
      pageNotification.classList.remove("show");
    }, duration);
  }

  function updateVolumeDisplay(level) {
    volumeSlider.value = level;
    volumePercentage.textContent = `${level}%`;
  }

  function updateMuteButton(isMuted) {
    if (isMuted) {
      volumeMuteButton.classList.add("active-mute");
      volumeMuteButton.textContent = "🔊 Unmute";
    } else {
      volumeMuteButton.classList.remove("active-mute");
      volumeMuteButton.textContent = "🔇 Mute";
    }
  }

  function updateUIBasedOnPermissions() {
    // This function would normally enable/disable buttons based on actual permissions.
    // For this dummy version, we'll assume all are enabled initially, and just show notification.
    document.querySelectorAll(".action-button").forEach((button) => {
      button.disabled = false; // All buttons enabled in this dummy version
    });
    if (userPermissions.volume) {
      volumeSlider.disabled = false;
    } else {
      volumeSlider.disabled = true;
    }
  }

  // --- Event Listeners for Dashboard Actions ---

  // Logout
  logoutButton.addEventListener("click", () => {
    showNotification("Logged out successfully (simulated).", "success");
    setTimeout(() => {
      window.location.href = "/syspilot-emir/"; // Redirect to login page
    }, 1500);
  });

  // Energy Control Buttons
  document
    .querySelector(".action-button.shutdown")
    .addEventListener("click", () => {
      showNotification("Shutdown command sent (simulated).", "success");
    });

  document
    .querySelector(".action-button.restart")
    .addEventListener("click", () => {
      showNotification("Reboot command sent (simulated).", "success");
    });

  document
    .querySelector(".action-button.lock")
    .addEventListener("click", () => {
      showNotification("Lock session command sent (simulated).", "success");
    });

  // Multimedia Control Buttons
  document
    .querySelector(".action-button.media-previous")
    .addEventListener("click", () => {
      showNotification("Previous track command sent (simulated).", "info");
    });

  document
    .querySelector(".action-button.play-pause")
    .addEventListener("click", () => {
      showNotification("Play/Pause command sent (simulated).", "info");
    });

  document
    .querySelector(".action-button.media-next")
    .addEventListener("click", () => {
      showNotification("Next track command sent (simulated).", "info");
    });

  // Volume Control
  let volumeTimeout;
  volumeSlider.addEventListener("input", () => {
    const newVolume = volumeSlider.value;
    volumePercentage.textContent = `${newVolume}%`; // Update percentage in real-time
    clearTimeout(volumeTimeout);
    volumeTimeout = setTimeout(() => {
      showNotification(`Volume set to ${newVolume}% (simulated).`, "info");
    }, 300); // Debounce for volume changes
  });

  volumeMuteButton.addEventListener("click", () => {
    const isCurrentlyMuted = volumeMuteButton.classList.contains("active-mute");
    updateMuteButton(!isCurrentlyMuted);
    showNotification(
      `Volume ${isCurrentlyMuted ? "unmuted" : "muted"} (simulated).`,
      "info",
    );
  });

  // System Metrics (dummy data and update)
  function updateSystemMetrics() {
    cpuUsageSpan.textContent = `${(Math.random() * 20 + 10).toFixed(1)}%`; // 10-30%
    ramUsageSpan.textContent = `${(Math.random() * 15 + 25).toFixed(1)}%`; // 25-40%
    // Simulate uptime
    const now = new Date();
    const bootTime = new Date(
      now.getTime() - (Math.random() * 86400000 * 7 + 3600000),
    ); // Up to 7 days + 1 hour
    const diffHours = Math.floor((now - bootTime) / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const remainingHours = diffHours % 24;
    uptimeSpan.textContent = `${diffDays} days, ${remainingHours} hours`;
  }
  // Update metrics every 5 seconds (simulated)
  setInterval(updateSystemMetrics, 5000);
  updateSystemMetrics(); // Initial call

  // --- Modal Handling (dummy for UI, no real data operations) ---

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Check which modal the button belongs to and close it
      if (button.closest(".modal")) {
        button.closest(".modal").style.display = "none";
        showNotification("Modal closed (simulated).", "info");
      }
    });
  });

  manageUsersButton.addEventListener("click", () => {
    userManagementModal.style.display = "flex";
    showNotification("User management modal opened (simulated).", "info");
    // Simulate loading users (empty or dummy data)
    const usersTableBody = document.querySelector("#users-table tbody");
    usersTableBody.innerHTML = `
            <tr><td>1</td><td>admin</td><td>All</td><td><button class="action-button edit-button">Edit</button> <button class="action-button delete-button">Delete</button></td></tr>
            <tr><td>2</td><td>guest</td><td>Volume</td><td><button class="action-button edit-button">Edit</button> <button class="action-button delete-button">Delete</button></td></tr>
        `;
    document.getElementById("no-users-message").style.display = "none";

    // Add dummy event listeners for edit/delete buttons if needed for more simulation
    document.querySelectorAll(".edit-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        editUserModal.style.display = "flex";
        document.getElementById("edit-username-title").textContent =
          `Edit User: ${btn.closest("tr").children[1].textContent}`;
        showNotification("Edit user modal opened (simulated).", "info");
      });
    });
    document.querySelectorAll(".delete-button").forEach((btn) => {
      btn.addEventListener("click", () => {
        showNotification(
          `User "${btn.closest("tr").children[1].textContent}" deleted (simulated).`,
          "success",
        );
        btn.closest("tr").remove();
      });
    });

    // Dummy tab switching
    document.querySelectorAll(".modal-tab-button").forEach((tabButton) => {
      tabButton.addEventListener("click", () => {
        document
          .querySelectorAll(".modal-tab-button")
          .forEach((btn) => btn.classList.remove("active"));
        document
          .querySelectorAll(".tab-content")
          .forEach((content) => content.classList.remove("active"));
        tabButton.classList.add("active");
        document
          .getElementById(`${tabButton.dataset.tab}-tab`)
          .classList.add("active");
        showNotification(
          `Switched to "${tabButton.dataset.tab}" tab (simulated).`,
          "info",
        );
      });
    });

    // Dummy add user form submission
    document.getElementById("add-user-form").addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        const username = document.getElementById("new-username").value;
        showNotification(`User "${username}" added (simulated).`, "success");
        document.getElementById("add-user-form").reset();
        // Simulate adding to table
        const newRow = usersTableBody.insertRow();
        newRow.innerHTML = `<tr><td>${Math.floor(Math.random() * 1000) + 10}</td><td>${username}</td><td>Some Perms</td><td><button class="action-button edit-button">Edit</button> <button class="action-button delete-button">Delete</button></td></tr>`;
      },
      { once: true },
    ); // Use once: true to prevent multiple submissions on dummy form

    // Dummy edit user form submission
    document.getElementById("edit-user-form").addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
        showNotification("User permissions updated (simulated).", "success");
        editUserModal.style.display = "none";
      },
      { once: true },
    );
  });

  manageCustomCommandsButton.addEventListener("click", () => {
    customCommandsModal.style.display = "flex";
    showNotification("Custom commands modal opened (simulated).", "info");
    // Simulate loading commands
    const commandList = document.getElementById("command-list");
    commandList.innerHTML = `
            <div class="command-item">
                <label>Shutdown Command:</label>
                <input type="text" value="sudo systemctl poweroff">
            </div>
            <div class="command-item">
                <label>Restart Command:</label>
                <input type="text" value="sudo systemctl reboot">
            </div>
        `;
    document.getElementById("save-commands-button").addEventListener(
      "click",
      () => {
        showNotification("Commands saved (simulated).", "success");
      },
      { once: true },
    );
    document.getElementById("reset-commands-button").addEventListener(
      "click",
      () => {
        showNotification("Commands reset to defaults (simulated).", "info");
        // Re-render default commands if needed
      },
      { once: true },
    );
  });

  // --- Global ESC key listener for modals ---
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (editUserModal.style.display === "flex") {
        editUserModal.style.display = "none";
      } else if (customCommandsModal.style.display === "flex") {
        customCommandsModal.style.display = "none";
      } else if (userManagementModal.style.display === "flex") {
        userManagementModal.style.display = "none";
      } else if (customAlertModal.style.display === "flex") {
        customAlertModal.style.display = "none";
      }

      if (pageNotification.classList.contains("show")) {
        pageNotification.classList.remove("show");
      }
    }
  });

  // Initial UI setup
  welcomeMessage.textContent = `Welcome, admin!`; // Example welcome message
  updateUIBasedOnPermissions();
  updateVolumeDisplay(50); // Set initial volume
  updateMuteButton(false); // Set initial mute status
});
