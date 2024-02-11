

module.exports = {
  title: "XTTS-RVC",
  description: "A Gradio UI for XTTSv2 and RVC, allowing for real-time voice conversion.",
  icon: "icon.jpg",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "venv")
    let installing = await kernel.running(__dirname, "install.js")
    if (installing) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      let session = await kernel.require(__dirname, "session.json")
      let running = await kernel.running(__dirname, "start.json")
      if (running) {
        if (session && session.url) {
          return [{
            icon: "fa-solid fa-rocket",
            text: "Open UI",
            href: session.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.json",
          }]
        } else {
          return [{
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.json",
          }]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.json",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }]
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.json",
        params: { run: true, fullscreen: true }
      }]
    }
  }
}
