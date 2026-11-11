"use strict";

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-form-status");
const contactAddress = "lmelo7262@gmail.com";

if (!(contactForm instanceof HTMLFormElement) || !(contactStatus instanceof HTMLElement)) {
    throw new Error("O formulário de contato não foi encontrado.");
}

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
        contactStatus.textContent = "Preencha todos os campos antes de enviar.";
        return;
    }

    const subject = `Contato pelo site Victoria Brass - ${name}`;
    const body = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
    const gmailComposeUrl = new URL("https://mail.google.com/mail/");
    gmailComposeUrl.searchParams.set("view", "cm");
    gmailComposeUrl.searchParams.set("fs", "1");
    gmailComposeUrl.searchParams.set("to", contactAddress);
    gmailComposeUrl.searchParams.set("su", subject);
    gmailComposeUrl.searchParams.set("body", body);

    contactStatus.textContent = "Abrindo o Gmail para você revisar e enviar a mensagem.";
    window.location.assign(gmailComposeUrl.toString());
});
