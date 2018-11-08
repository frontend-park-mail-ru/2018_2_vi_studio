function pug_rethrow(n, e, r, t) {
    if (!(n instanceof Error)) throw n;
    if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;
    try {
        t = t || require("fs").readFileSync(e, "utf8")
    } catch (e) {
        pug_rethrow(n, null, r)
    }
    var i = 3, a = t.split("\n"), o = Math.max(r - i, 0), h = Math.min(a.length, r + i),
        i = a.slice(o, h).map(function (n, e) {
            var t = e + o + 1;
            return (t == r ? "  > " : "    ") + t + "| " + n
        }).join("\n");
    throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n
}

function renderBackground(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        ;pug_debug_line = 1;
        pug_debug_filename = "\u002Fhome\u002Fviews\u002FGithub\u002F2018_2_vi_studio_client\u002Fpublic\u002Fjavascripts\u002Fcomponents\u002Fbackground\u002FBackground.pug";
        pug_html = pug_html + "\u003Cdiv class=\"background\"\u003E";
        ;pug_debug_line = 2;
        pug_debug_filename = "\u002Fhome\u002Fviews\u002FGithub\u002F2018_2_vi_studio_client\u002Fpublic\u002Fjavascripts\u002Fcomponents\u002Fbackground\u002FBackground.pug";
        pug_html = pug_html + "\u003Cdiv class=\"background__filter\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    } catch (err) {
        pug_rethrow(err, pug_debug_filename, pug_debug_line);
    }
    ;
    return pug_html;
}

import Component from "../Component.js";

export default class Background extends Component {
    constructor(props) {
        super(props);
        this.getHTML = renderBackground.bind(this, props);
    }
}