import Template from "./footer.pug";
import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(Template(params));
    return template;
}

includeStyle("footer");

export default render;