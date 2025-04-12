async function downloadVideo() {
  const input = document.getElementById("tiktok-url").value.trim();
  const result = document.getElementById("result");

  if (!input) return (result.innerHTML = "<p>Please enter a URL.</p>");

  try {
    // Coba resolve dulu kalau shortlink
    let finalUrl = input;
    if (input.includes("vt.tiktok.com")) {
      const res = await fetch("/resolve?url=" + encodeURIComponent(input));
      const json = await res.json();
      finalUrl = json.finalUrl;
    }

    const apiUrl = `https://api.tiklydown.eu.org/api/download/v5?url=${encodeURIComponent(finalUrl)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.video && data.video.no_watermark) {
      result.innerHTML = `
        <video width="100%" controls>
          <source src="${data.video.no_watermark}" type="video/mp4">
        </video>
        <br/>
        <a href="${data.video.no_watermark}" download>
          <button>Download Video</button>
        </a>
      `;
    } else {
      result.innerHTML = "<p>Video not found or invalid URL.</p>";
    }
  } catch (err) {
    console.error(err);
    result.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}