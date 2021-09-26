import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(puglatizer.auth.auth(params));
    return template;
}

includeStyle("auth");

export default render;