import Template from "./header.pug";
import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(Template(params));
    return template;
}

includeStyle("header");

export default render;
