"use strict";

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-form-status");
const contactAddress = "lmelo7262@gmail.com";

if (!(contactForm instanceof HTMLFormElement) || !(contactStatus instanceof HTMLElement)) {
    throw new Error("O formulário de contato não foi encontrado.");
}

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
        contactStatus.textContent = "Preencha todos os campos antes de enviar.";
        return;
    }

    const subject = "Contato pelo site Victoria Brass";
    const body = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
    const gmailComposeUrl = new URL("https://mail.google.com/mail/");
    gmailComposeUrl.searchParams.set("view", "cm");
    gmailComposeUrl.searchParams.set("fs", "1");
    gmailComposeUrl.searchParams.set("to", contactAddress);
    gmailComposeUrl.searchParams.set("su", subject);

    try {
        await navigator.clipboard.writeText(body);
        contactStatus.textContent = "Mensagem copiada. Cole-a na composição do Gmail, revise e envie.";
    } catch (error) {
        contactStatus.textContent = "Não foi possível copiar automaticamente. Copie os campos do formulário e cole-os na composição do Gmail.";
        console.error("Não foi possível copiar a mensagem para a área de transferência.", error);
    }

    window.location.assign(gmailComposeUrl.toString());
});
