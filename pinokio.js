const os = require('os');
const fs = require('fs').promises; // Use promises for fs module
const path = require("path");

// Function to check if a file or directory exists
const exists = async (filepath) => {
  try {
    // Check if the file/directory exists
    await fs.access(filepath, fs.constants.F_OK);
    return true; // Return true if it exists
  } catch (error) {
    return false; // Return false if it doesn't exist or error occurs
  }
};

module.exports = {
  title: "XTTS-RVC",
  description: "A Gradio UI for XTTSv2 and RVC, allowing for real-time voice conversion.",
  icon: "icon.jpg",
  menu: async (kernel) => {
    const uiDirectory = path.resolve(__dirname, "XTTS-RVC-UI");
    
    // Concurrently check if the UI directory exists and load session data
    const [installed, session] = await Promise.all([
      exists(uiDirectory), // Check if the UI directory exists
      kernel.loader.load(path.resolve(__dirname, "session.json")) // Load session data
    ]);

    // Handle errors if any
    if (!installed) {
      // If UI directory doesn't exist, return install link
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        type: "link",
        href: "install.json?run=true&fullscreen=true"
      }];
    }

    // Extract session URL if available
    const sessionUrl = session.resolved && session.resolved.url;

    // Return menu items based on installation status
    return [{
      when: "start.json",
      on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Running",
      type: "label",
      href: "start.json"
    }, {
      when: "start.json",
      off: "<i class='fa-solid fa-power-off'></i> Launch",
      href: "start.json?fullscreen=true&run=true",
    }, {
      when: "start.json",
      on: sessionUrl ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null,
      href: sessionUrl,
      target: "_blank"
    }, {
      when: "start.json",
      on: "<i class='fa-solid fa-desktop'></i> Server",
      href: "start.json?fullscreen=true"
    }, {
      when: "start.json",
      on: "<i class='fa-solid fa-cloud-download'></i> Update",
      href: "update.js?run=true&fullscreen=true"
    }];
  }
};
