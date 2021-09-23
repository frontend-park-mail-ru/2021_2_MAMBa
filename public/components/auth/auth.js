import Template from "./auth.pug";
import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(Template(params));
    return template;
}

includeStyle("auth");

export default render;