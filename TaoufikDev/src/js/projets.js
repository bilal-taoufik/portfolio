import projectsData from "../data/projets.json";

const projectsGrid = document.querySelector("#projectsGrid");
const projectsFilters = document.querySelector("#projectsFilters");

const projects = projectsData;

function renderProjects(projectsToDisplay) {
    projectsGrid.innerHTML = "";

    projectsToDisplay.forEach((project) => {
        const article = document.createElement("article");

        article.classList.add("project-card");

        article.innerHTML = `
            <a href="${project.url}" class="project-card-link">

                <div class="project-card-visual">

                    <span class="project-card-corner project-card-corner--top-left"></span>
                    <span class="project-card-corner project-card-corner--top-right"></span>
                    <span class="project-card-corner project-card-corner--bottom-left"></span>
                    <span class="project-card-corner project-card-corner--bottom-right"></span>

                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="project-card-image"
                        loading="lazy"
                    >

                </div>

                <div class="project-card-content">

                    <h2 class="project-card-title">
                        ${project.title}
                    </h2>

                    <p class="project-card-description">
                        ${project.description}
                    </p>

                    <span class="project-card-category">
                        <span></span>
                        ${project.category}
                    </span>

                </div>

            </a>
        `;

        projectsGrid.appendChild(article);
    });
}


function renderFilters(projectsData) {
    const categories = [
        "Tous",
        ...new Set(
            projectsData.map((project) => project.category)
        )
    ];

    projectsFilters.innerHTML = "";

    categories.forEach((category, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "projects-filter";

        if (index === 0) {
            button.classList.add("is-active");
        }

        button.dataset.filter = category;

        button.innerHTML = `
            <span class="projects-filter-square"></span>
            ${category}
        `;

        projectsFilters.appendChild(button);
    });
}


projectsFilters?.addEventListener("click", (event) => {
    const button = event.target.closest(".projects-filter");

    if (!button) return;

    document
        .querySelectorAll(".projects-filter")
        .forEach((filter) => {
            filter.classList.remove("is-active");
        });

    button.classList.add("is-active");

    const selectedCategory = button.dataset.filter;

    if (selectedCategory === "Tous") {
        renderProjects(projects);
        return;
    }

    const filteredProjects = projects.filter(
        (project) => project.category === selectedCategory
    );

    renderProjects(filteredProjects);
});


if (projectsGrid && projectsFilters) {
    renderProjects(projects);
    renderFilters(projects);
}