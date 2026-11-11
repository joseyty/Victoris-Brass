"use strict";

// Para adicionar uma faixa, informe o caminho relativo do arquivo, por exemplo:
// "01": "audio/dama-das-engrenagens.mp3"
const musicFiles = {
    "01": "audio/Victoria Brass — A Dama das EngrenagensDuração estimada_ 2min50s.mp3",
    "02": "audio/O Baile das Máscaras de BronzeDuração_ aproximDuração estimada_ 2min50s.mp3",
    "03": "audio/Victoria Brass — A Cidade Nunca DormeDuração_ aproximDuração estimada_ 2min50s (1).mp3",
    "04": "",
    "05": "",
    "06": "",
    "07": "",
    "08": "",
    "09": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": ""
};

document.querySelectorAll(".music-card").forEach((card) => {
    const numberElement = card.querySelector(".music-card__number");
    const status = card.querySelector(".music-card__status");
    const title = card.querySelector("h3");
    const body = card.querySelector(".music-card__body");

    if (!numberElement || !status || !title || !body) {
        console.error("Card de música incompleto:", card);
        return;
    }

    status.setAttribute("aria-live", "polite");

    const number = numberElement.textContent.trim();
    if (!Object.prototype.hasOwnProperty.call(musicFiles, number)) {
        status.textContent = "Faixa sem configuração";
        console.error(`Não há configuração de áudio para a faixa ${number}.`);
        return;
    }

    const source = musicFiles[number].trim();
    if (!source) {
        status.textContent = "Áudio pendente";
        return;
    }

    const audio = new Audio(encodeURI(source));
    audio.preload = "metadata";

    const player = document.createElement("div");
    player.className = "music-player";

    const toggle = document.createElement("button");
    toggle.className = "music-player__toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", `Reproduzir ${title.textContent.trim()}`);
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg>';

    const timeline = document.createElement("div");
    timeline.className = "music-player__timeline";

    const progress = document.createElement("input");
    progress.className = "music-player__progress";
    progress.type = "range";
    progress.min = "0";
    progress.max = "100";
    progress.value = "0";
    progress.setAttribute("aria-label", `Progresso de ${title.textContent.trim()}`);

    const times = document.createElement("div");
    times.className = "music-player__times";

    const currentTime = document.createElement("span");
    currentTime.textContent = "0:00";

    const duration = document.createElement("span");
    duration.textContent = "--:--";

    const volumeLabel = document.createElement("label");
    volumeLabel.className = "music-player__volume";
    volumeLabel.setAttribute("aria-label", "Volume");

    const volumeIcon = document.createElement("span");
    volumeIcon.setAttribute("aria-hidden", "true");
    volumeIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4zm12-2a7 7 0 0 1 0 10m2-13a10 10 0 0 1 0 16"/></svg>';

    const volume = document.createElement("input");
    volume.className = "music-player__volume-range";
    volume.type = "range";
    volume.min = "0";
    volume.max = "1";
    volume.step = "0.01";
    volume.value = String(audio.volume);
    volume.setAttribute("aria-label", `Volume de ${title.textContent.trim()}`);

    times.append(currentTime, duration);
    timeline.append(progress, times);
    volumeLabel.append(volumeIcon, volume);
    player.append(toggle, timeline, volumeLabel);

    const formatTime = (seconds) => {
        if (!Number.isFinite(seconds)) return "--:--";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${minutes}:${remainingSeconds}`;
    };

    toggle.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch((error) => {
                status.textContent = "Não foi possível reproduzir";
                console.error(`Não foi possível reproduzir o áudio da faixa ${number}: ${source}`, error);
            });
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        toggle.setAttribute("aria-label", `Pausar ${title.textContent.trim()}`);
        toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>';
        player.classList.add("is-playing");
    });
    audio.addEventListener("pause", () => {
        toggle.setAttribute("aria-label", `Reproduzir ${title.textContent.trim()}`);
        toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg>';
        player.classList.remove("is-playing");
    });
    audio.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audio.duration);
        status.textContent = "Pronto para ouvir";
    });
    audio.addEventListener("timeupdate", () => {
        currentTime.textContent = formatTime(audio.currentTime);
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            progress.value = String((audio.currentTime / audio.duration) * 100);
            progress.style.setProperty("--progress", `${progress.value}%`);
        }
    });
    audio.addEventListener("ended", () => {
        progress.value = "0";
        progress.style.setProperty("--progress", "0%");
        currentTime.textContent = "0:00";
    });
    audio.addEventListener("error", () => {
        status.textContent = "Erro ao carregar áudio";
        console.error(`Não foi possível carregar o áudio da faixa ${number}: ${source}`, audio.error);
    });
    progress.addEventListener("input", () => {
        if (Number.isFinite(audio.duration)) {
            audio.currentTime = (Number(progress.value) / 100) * audio.duration;
            progress.style.setProperty("--progress", `${progress.value}%`);
        }
    });
    volume.addEventListener("input", () => {
        audio.volume = Number(volume.value);
    });

    status.textContent = "Carregando áudio";
    body.insertBefore(player, status);
});