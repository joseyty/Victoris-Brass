"use strict";

const characterDetails = {
    victoria: {
        name: "Victoria Brass",
        role: "A dama das engrenagens",
        image: "img/Victoria-cross.png",
        alt: "Victoria Brass, inventora steampunk de cabelos vermelhos e cartola com engrenagens",
        bio: "Inventora, sonhadora e aventureira, Victoria percorre uma cidade movida a vapor em busca de novas descobertas e de seu próprio caminho.",
        detail: "Entre relógios, máquinas e melodias, ela prova que até em um mundo de engrenagens há espaço para sonhar.",
        quote: "“O futuro pertence àqueles que ousam sonhar.”"
    },
    helena: {
        name: "Lady Helena",
        role: "A nobre misteriosa",
        bio: "Elegante e reservada, Lady Helena conhece os salões da alta sociedade e os segredos que neles circulam.",
        detail: "Por trás de cada gesto calculado, há uma aliada que pode abrir portas — ou revelar uma nova pista.",
        quote: "“Nem todo segredo foi feito para permanecer oculto.”"
    },
    maxwell: {
        name: "Dr. Maxwell",
        role: "O cientista visionário",
        image: "img/Dr.maxwell art.jpg",
        alt: "Dr. Maxwell, cientista de cartola e óculos steampunk em seu laboratório",
        bio: "Pesquisador incansável, Dr. Maxwell dedica seus dias a testar ideias que desafiam os limites da ciência a vapor.",
        detail: "Seus experimentos podem mudar o futuro da cidade, desde que a curiosidade não se adiante à cautela.",
        quote: "“Toda grande invenção começa com uma pergunta.”"
    },
    eloise: {
        name: "Eloise",
        role: "A aprendiz curiosa",
        image: "img/Eloise art.jpg",
        alt: "Eloise, aprendiz inventora com boina e óculos de aviador",
        bio: "Atenta e cheia de perguntas, Eloise aprende observando de perto cada ferramenta, mecanismo e decisão.",
        detail: "Sua curiosidade transforma pequenos detalhes em descobertas e cada desafio em uma nova oportunidade de crescer.",
        quote: "“Sempre existe algo novo para descobrir.”"
    },
    gregor: {
        name: "Gregor Black",
        role: "O caçador de segredos",
        bio: "Silencioso e persistente, Gregor segue rastros que outros prefeririam ignorar.",
        detail: "Em uma cidade cheia de passagens escondidas, sua habilidade para conectar pistas pode revelar verdades esquecidas.",
        quote: "“Toda engrenagem deixa uma pista.”"
    },
    mila: {
        name: "Mila",
        role: "A IA companheira",
        image: "img/mila art.jpg",
        alt: "Mila, companheira de cabelos claros e adornos steampunk",
        bio: "Mila é uma inteligência artificial companheira, pronta para analisar informações e ajudar a equipe em suas jornadas.",
        detail: "Entre cálculos precisos e conversas inesperadas, ela mostra que lógica e empatia também podem caminhar juntas.",
        quote: "“Estou aqui. Qual é o próximo passo?”"
    },
    nora: {
        name: "Nora",
        role: "A observadora",
        bio: "Nora observa o mundo com paciência e percebe detalhes que facilmente passam despercebidos.",
        detail: "Seu olhar atento ajuda a compreender pessoas, lugares e os acontecimentos que conectam cada história.",
        quote: "“Às vezes, basta parar e observar.”"
    }
};

const characterTabs = Array.from(document.querySelectorAll("[role='tab'][data-character]"));
const characterPanel = document.querySelector("#character-panel");
const characterImage = document.querySelector("[data-character-image]");
const characterPlaceholder = document.querySelector("[data-character-placeholder]");
const characterName = document.querySelector("[data-character-name]");
const characterHeading = document.querySelector("#about-title");
const characterRoles = Array.from(document.querySelectorAll("[data-character-role]"));
const characterBio = document.querySelector("[data-character-bio]");
const characterDetail = document.querySelector("[data-character-detail]");
const characterQuote = document.querySelector("[data-character-quote]");
const characterCite = document.querySelector("[data-character-cite]");

if (
    characterTabs.length === 0 ||
    !characterPanel ||
    !characterImage ||
    !characterPlaceholder ||
    !characterName ||
    !characterHeading ||
    characterRoles.length === 0 ||
    !characterBio ||
    !characterDetail ||
    !characterQuote ||
    !characterCite
) {
    throw new Error("Não foi possível inicializar o visor de personagens.");
}

const selectCharacter = (tab, moveFocus = false) => {
    const character = characterDetails[tab.dataset.character];
    if (!character) {
        console.error(`Não há informações configuradas para o personagem "${tab.dataset.character}".`);
        return;
    }

    characterTabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
    });

    characterPanel.setAttribute("aria-labelledby", tab.id);
    characterName.textContent = character.name;
    characterHeading.textContent = character.name;
    characterRoles.forEach((role) => {
        role.textContent = character.role;
    });
    characterBio.textContent = character.bio;
    characterDetail.textContent = character.detail;
    characterQuote.textContent = character.quote;
    characterCite.textContent = `— ${character.name}`;

    if (character.image) {
        characterImage.src = character.image;
        characterImage.alt = character.alt;
        characterImage.hidden = false;
        characterPlaceholder.hidden = true;
    } else {
        characterImage.hidden = true;
        characterImage.removeAttribute("src");
        characterImage.alt = "";
        characterPlaceholder.querySelector("span").textContent = character.name
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0])
            .join("");
        characterPlaceholder.hidden = false;
    }

    if (moveFocus) tab.focus();
};

characterTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectCharacter(tab));
    tab.addEventListener("keydown", (event) => {
        let nextIndex;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            nextIndex = (index + 1) % characterTabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            nextIndex = (index - 1 + characterTabs.length) % characterTabs.length;
        } else if (event.key === "Home") {
            nextIndex = 0;
        } else if (event.key === "End") {
            nextIndex = characterTabs.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        selectCharacter(characterTabs[nextIndex], true);
    });
});
