import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(header(params));
    return template;
}

includeStyle("header");

export default render;
