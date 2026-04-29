(() => {
  const GA_MEASUREMENT_ID = "";

  window.logoAtlasAnalytics = {
    enabled: Boolean(GA_MEASUREMENT_ID),
    track(eventName, params = {}) {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      }
    },
  };

  if (!GA_MEASUREMENT_ID) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.append(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
})();
