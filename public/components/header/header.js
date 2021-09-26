import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(puglatizer.header.header(params));
    return template;
}

includeStyle("header");

export default render;
