// =====================================================
// HYPEFORGE - MAIN WEBSITE JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------
    // MOBILE MENU
    // -------------------------------------------------

    const navbar = document.querySelector(".navbar");
    const nav = document.querySelector(".navbar nav");

    if (navbar && nav) {

        const menuButton = document.createElement("button");

        menuButton.className = "menu-button";
        menuButton.type = "button";
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.innerHTML = "☰";

        navbar.insertBefore(menuButton, nav);

        menuButton.addEventListener("click", () => {
            nav.classList.toggle("nav-open");

            menuButton.innerHTML =
                nav.classList.contains("nav-open")
                    ? "✕"
                    : "☰";
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("nav-open");
                menuButton.innerHTML = "☰";
            });
        });
    }


    // -------------------------------------------------
    // ACTIVE NAVIGATION LINK
    // -------------------------------------------------

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar nav a").forEach(link => {

        const linkPage =
            link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    // -------------------------------------------------
    // SMOOTH SCROLL
    // -------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // -------------------------------------------------
    // OPPORTUNITY SEARCH
    // -------------------------------------------------

    const opportunitySearch =
        document.getElementById("opportunitySearch");

    if (opportunitySearch) {

        opportunitySearch.addEventListener("submit", event => {

            event.preventDefault();

            const input =
                document.getElementById("search");

            const searchValue =
                input ? input.value.trim() : "";

            if (!searchValue) {

                showMessage(
                    "Please enter something to search.",
                    "warning"
                );

                return;
            }

            showMessage(
                `Searching for "${searchValue}"...`,
                "success"
            );

        });

    }


    // -------------------------------------------------
    // BUTTON LOADING EFFECT
    // -------------------------------------------------

    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", () => {

            const button =
                form.querySelector("button[type='submit']");

            if (!button) return;

            button.dataset.originalText =
                button.innerHTML;

        });

    });


    // -------------------------------------------------
    // SCROLL REVEAL
    // -------------------------------------------------

    const revealElements =
        document.querySelectorAll(
            ".card, .step, .content-section, .cta"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    }


    // -------------------------------------------------
    // CURRENT YEAR
    // -------------------------------------------------

    document.querySelectorAll(".copyright").forEach(element => {

        element.innerHTML =
            element.innerHTML.replace(
                /©\s*\d{4}/,
                `© ${new Date().getFullYear()}`
            );

    });

});


// =====================================================
// MESSAGE SYSTEM
// =====================================================

function showMessage(message, type = "info") {

    let box =
        document.getElementById("hf-message");

    if (!box) {

        box = document.createElement("div");

        box.id = "hf-message";

        document.body.appendChild(box);

    }

    box.className = `hf-message ${type}`;

    box.textContent = message;

    requestAnimationFrame(() => {
        box.classList.add("show");
    });

    setTimeout(() => {
        box.classList.remove("show");
    }, 3000);
}
