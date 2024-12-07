// Function to create a speed control overlay for videos
function createSpeedController(video) {
    if (video.hasAttribute("data-speed-controller")) return;
  
    video.setAttribute("data-speed-controller", "true");
  
    const controller = document.createElement("div");
    controller.style.position = "absolute";
    controller.style.zIndex = "999999";
    controller.style.background = "rgba(0, 0, 0, 0.7)";
    controller.style.color = "white";
    controller.style.padding = "5px 10px";
    controller.style.borderRadius = "5px";
    controller.style.fontSize = "14px";
    controller.style.cursor = "pointer";
    controller.style.display = "flex";
    controller.style.alignItems = "center";
    controller.style.gap = "5px";
    controller.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.5)";
    controller.style.pointerEvents = "auto";
  
    const updatePosition = () => {
      const videoRect = video.getBoundingClientRect();
      controller.style.top = `${Math.max(10, videoRect.top - 40)}px`;
      controller.style.left = `${Math.max(10, videoRect.left + 10)}px`;
    };
    updatePosition();
  
    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.style.background = "none";
    decreaseButton.style.color = "white";
    decreaseButton.style.border = "1px solid white";
    decreaseButton.style.padding = "2px 5px";
    decreaseButton.style.cursor = "pointer";
  
    const speedDisplay = document.createElement("span");
    speedDisplay.textContent = `${video.playbackRate.toFixed(1)}x`;
  
    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.style.background = "none";
    increaseButton.style.color = "white";
    increaseButton.style.border = "1px solid white";
    increaseButton.style.padding = "2px 5px";
    increaseButton.style.cursor = "pointer";
  
    const updateSpeedDisplay = () => {
      speedDisplay.textContent = `${video.playbackRate.toFixed(1)}x`;
    };
    updateSpeedDisplay();
  
    decreaseButton.addEventListener("click", (event) => {
      event.stopPropagation();
      video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
      updateSpeedDisplay();
    });
  
    increaseButton.addEventListener("click", (event) => {
      event.stopPropagation();
      video.playbackRate += 0.1;
      updateSpeedDisplay();
    });
  
    controller.appendChild(decreaseButton);
    controller.appendChild(speedDisplay);
    controller.appendChild(increaseButton);
  
    document.body.appendChild(controller);
  
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(video);
    window.addEventListener("resize", updatePosition);
    video.addEventListener("ratechange", updateSpeedDisplay);
  }
  
  // Function to handle global keyboard shortcuts
  function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (event) => {
      const video = document.querySelector("video"); // Target the first video on the page
      if (!video) return;
  
      if (event.key === "+") {
        // Increase speed
        video.playbackRate += 0.1;
      } else if (event.key === "-") {
        // Decrease speed
        video.playbackRate = Math.max(0.1, video.playbackRate - 0.1);
      }
  
      // Update controller if present
      const controller = document.querySelector("[data-speed-controller]");
      if (controller) {
        const speedDisplay = controller.querySelector("span");
        if (speedDisplay) {
          speedDisplay.textContent = `${video.playbackRate.toFixed(1)}x`;
        }
      }
    });
  }
  
  // Function to scan for videos and set up controllers
  function scanForVideos() {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => createSpeedController(video));
  }
  
  // Observe DOM changes to detect dynamically added videos
  const observer = new MutationObserver(scanForVideos);
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Run initially to catch existing videos
  scanForVideos();
  
  // Setup global keyboard shortcuts
  setupKeyboardShortcuts();
  