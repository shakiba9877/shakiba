/* =========================================================
   SHAKIBA — WEBSITE INTERACTIONS
   ========================================================= */

const languageButtons = document.querySelectorAll(".languages button");
const translatedElements = document.querySelectorAll("[data-en]");

/* -------------------------
   LANGUAGE SWITCHER
------------------------- */

function changeLanguage(language) {

    translatedElements.forEach(element => {

        const translation = element.getAttribute(`data-${language}`);

        if (translation) {
            element.textContent = translation;
        }

    });


    languageButtons.forEach(button => {
        button.classList.remove("active");
    });

    const activeButton =
        document.querySelector(`[data-lang="${language}"]`);

    if (activeButton) {
        activeButton.classList.add("active");
    }


    /* Persian layout */

    if (language === "fa") {

        document.documentElement.lang = "fa";
        document.body.classList.add("persian");

    } else {

        document.documentElement.lang = language;
        document.body.classList.remove("persian");

    }


    /* remember visitor's language */

    localStorage.setItem(
        "shakiba-language",
        language
    );

}


languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const language =
            button.getAttribute("data-lang");

        changeLanguage(language);

    });

});


/* restore previously selected language */

const savedLanguage =
    localStorage.getItem("shakiba-language");

if (savedLanguage) {
    changeLanguage(savedLanguage);
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".content-section, .portal-card, .teaching-grid article"
    );


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


/* =========================================================
   SUBTLE HERO MOVEMENT
   ========================================================= */

const hero =
    document.querySelector(".hero");

const planetOne =
    document.querySelector(".planet-one");

const planetTwo =
    document.querySelector(".planet-two");

const sun =
    document.querySelector(".sun");


if (hero) {

    hero.addEventListener(
        "mousemove",
        event => {

            /* Don't run the effect on small screens */

            if (window.innerWidth < 900) {
                return;
            }


            const x =
                event.clientX /
                window.innerWidth -
                0.5;

            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            if (planetOne) {

                planetOne.style.transform =
                    `translate(
                        ${x * 18}px,
                        ${y * 18}px
                    )`;

            }


            if (planetTwo) {

                planetTwo.style.transform =
                    `translate(
                        ${x * -25}px,
                        ${y * -25}px
                    )`;

            }


            if (sun) {

                sun.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )`;

            }

        }
    );

}


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const destination =
                    link.getAttribute("href");

                if (
                    !destination ||
                    destination === "#"
                ) {
                    return;
                }


                const section =
                    document.querySelector(
                        destination
                    );

                if (section) {

                    event.preventDefault();

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =========================================================
   HOMEPAGE LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);
