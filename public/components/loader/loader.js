import {createElementFromHTML, includeStyle} from "../../modules/utils.js";

function render(params) {
    let template = createElementFromHTML(loader(params));
    return template;
}

includeStyle("loader");

export default render;