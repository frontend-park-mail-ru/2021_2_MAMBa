import {createElementFromHTML, includeStyle} from "../../modules/utils.js";

function render(params) {
    let template = createElementFromHTML(header(params));
    return template;
}

includeStyle("header");

export default render;
