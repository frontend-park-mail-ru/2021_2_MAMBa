import {createElementFromHTML, includeStyle} from "../../modules/utils.js";
import {auth} from "../../templates.js"

function render(params) {
    let template = createElementFromHTML(auth(params));
    return template;
}

includeStyle("auth");

export default render;