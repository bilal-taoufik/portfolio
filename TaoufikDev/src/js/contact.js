const CONTACT_ENDPOINT = "https://formspree.io/f/xwvnkdoj";
const MAX_LENGTHS = {
    name: 80,
    email: 254,
    message: 3000,
};

function normalizeValue(value) {
    return value
        .normalize("NFKC")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim();
}

function containsMarkup(value) {
    return /[<>]/.test(value);
}

function validateContactData(data) {
    const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}\s'\u2019-]{1,79}$/u;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

    if (!namePattern.test(data.name)) {
        return "Indiquez un nom valide entre 2 et 80 caract\u00E8res.";
    }

    if (data.email.length > MAX_LENGTHS.email || !emailPattern.test(data.email)) {
        return "Indiquez une adresse e-mail valide.";
    }

    // if (data.message.length < 20 || data.message.length > MAX_LENGTHS.message) {
    //     return "Votre message doit contenir entre 20 et 3 000 caract\u00E8res.";
    // }

    if (Object.values(data).some(containsMarkup)) {
        return "Les balises HTML ne sont pas autoris\u00E9es dans le formulaire.";
    }

    return "";
}

function setFormState(form, status, message, state = "") {
    const submitButton = form.querySelector("button[type='submit']");
    const isLoading = state === "loading";

    status.textContent = message;
    status.dataset.state = state;
    submitButton.disabled = isLoading;
    submitButton.setAttribute("aria-disabled", String(isLoading));
}

function showSuccess(form, success, status) {
    form.reset();
    status.textContent = "";
    form.hidden = true;
    success.hidden = false;
    success.focus({ preventScroll: true });
}

async function submitContactForm(form, status, success) {
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const honeypot = normalizeValue(String(formData.get("_gotcha") || ""));

    if (honeypot) {
        showSuccess(form, success, status);
        return;
    }

    const data = {
        name: normalizeValue(String(formData.get("name") || "")),
        email: normalizeValue(String(formData.get("email") || "")).toLowerCase(),
        message: normalizeValue(String(formData.get("message") || "")),
    };
    const validationError = validateContactData(data);

    if (validationError) {
        setFormState(form, status, validationError, "error");
        return;
    }

    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("message", data.message);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    setFormState(form, status, "Envoi en cours...", "loading");

    try {
        const response = await fetch(CONTACT_ENDPOINT, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
            mode: "cors",
            credentials: "omit",
            referrerPolicy: "strict-origin-when-cross-origin",
            signal: controller.signal,
        });

        if (!response.ok) {
            const requestError = new Error("Formspree request failed");
            requestError.status = response.status;
            throw requestError;
        }

        showSuccess(form, success, status);
    } catch (error) {
        let message = "Le message n'a pas pu \u00EAtre envoy\u00E9. Veuillez r\u00E9essayer.";

        if (error.name === "AbortError") {
            message = "L'envoi a pris trop de temps. Veuillez r\u00E9essayer.";
        } else if (error.status === 403) {
            message = "Formspree refuse ce domaine. V\u00E9rifiez Restrict to Domain et le CAPTCHA dans Formspree.";
        } else if (error.status === 429) {
            message = "Trop de tentatives. Patientez quelques minutes avant de r\u00E9essayer.";
        }

        setFormState(form, status, message, "error");
    } finally {
        window.clearTimeout(timeoutId);

        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = false;
        submitButton.setAttribute("aria-disabled", "false");
    }
}

function initContactForm() {
    const form = document.querySelector("#contactForm");
    const status = document.querySelector("#contactFormStatus");
    const success = document.querySelector("#contactSuccess");

    if (!form || !status || !success) return;

    success.setAttribute("tabindex", "-1");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        void submitContactForm(form, status, success);
    });

    form.addEventListener("input", () => {
        if (status.dataset.state === "error") {
            setFormState(form, status, "", "");
        }
    });
}

document.addEventListener("DOMContentLoaded", initContactForm);