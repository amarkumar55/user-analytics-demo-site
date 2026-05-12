(function () {
  const API_URL = "https://user-analytics-api-zzqo.onrender.com/api/v1/events";

  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }

  function sendEvent(eventData) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Event Sent:", data);
      })
      .catch((err) => {
        console.error("Tracking Error:", err);
      });
  }

  // Track page view
  sendEvent({
    sessionId,
    type: "page_view",
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  });

  // Track clicks
  document.addEventListener("click", (event) => {
    sendEvent({
      sessionId,
      type: "click",
      url: window.location.href,
      timestamp: new Date().toISOString(),
      x: event.clientX,
      y: event.clientY,
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  });
})();
