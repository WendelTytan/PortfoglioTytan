export function carregarFaixas(user, apiKey, limit=20, containerId = "tracks") {
  fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById(containerId);
      container.innerHTML = "";

      if (!data.recenttracks || !data.recenttracks.track) {
        container.innerHTML = "<p>Nenhuma faixa recente encontrada.</p>";
        return;
      }

      data.recenttracks.track.forEach(track => {
        const div = document.createElement("div");
        div.className = "track";

        const image = track.image.find(img => img.size === "medium")?.["#text"] || "";
        const title = track.name;
        const artist = track.artist["#text"];

        let time = '';
        if (track.date && track.date.uts) {
          const date = new Date(track.date.uts * 1000);
          time = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });
        } else {
          time = "Agora tocando";
        }

        div.innerHTML = `
          <a href="${track.url}" target="_blank" class="track-link">
            <div class="track-left">
              <img src="${image}" alt="Album cover">
              <div class="track-info">
                <div class="title">${title}</div>
                <div class="artist">${artist}</div>
              </div>
            </div>
            <div class="track-time">${time}</div>
          </a>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById(containerId).innerHTML = "<p>Erro ao carregar faixas.</p>";
      console.error(err);
    });
}
  