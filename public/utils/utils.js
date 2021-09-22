function createElementFromHTML(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.firstChild;
}

function includeStyle(name) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/components/${name}/${name}.css`;
    document.head.appendChild(link);
}

export {createElementFromHTML, includeStyle};
