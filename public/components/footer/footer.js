import {createElementFromHTML, includeStyle} from "../../utils/utils.js";

function render(params) {
    let template = createElementFromHTML(puglatizer.footer.footer(params));
    return template;
}

includeStyle("footer");

export default render;