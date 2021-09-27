import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(footer(params));
    return template;
}

includeStyle("footer");

export default render;