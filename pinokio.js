

module.exports = {
  title: "XTTS-RVC",
  description: "A Gradio UI for XTTSv2 and RVC, allowing for real-time voice conversion.",
  icon: "icon.jpg",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "app", "venv")
    let installing = await kernel.running(__dirname, "install.js")
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved;
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
        on: (session && session.url ? "<i class='fa-solid fa-rocket'></i> Open Web UI" : null),
        href: (session && session.url ? session.url : null),
        target: "_blank"
      }, {
        when: "start.json",
        on: "<i class='fa-solid fa-desktop'></i> Server",
        href: "start.json?fullscreen=true"
      }];
    } else {
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        type: "link",
        href: "install.json?run=true&fullscreen=true"
      }];
    }
  }
}
