function pug_escape(e) {
    var a = "" + e, t = pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = "";
    for (r = t.index, c = 0; r < a.length; r++) {
        switch (a.charCodeAt(r)) {
            case 34:
                n = "&quot;";
                break;
            case 38:
                n = "&amp;";
                break;
            case 60:
                n = "&lt;";
                break;
            case 62:
                n = "&gt;";
                break;
            default:
                continue
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n
    }
    return c !== r ? s + a.substring(c, r) : s
}

var pug_match_html = /["&<>]/;

function renderLeaderboard(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (leaders) {
        pug_html = pug_html + "\u003C!--'\u003Cdiv class=\"leaders\"\u003E' +--\u003E\u003C!--this.props.leaders.map(item =\u003E `--\u003E\u003C!--                \u003Cdiv class=\"leaders__member\"\u003E--\u003E\u003C!--\u003Cdiv class=\"leaders__name\"\u003E${item.nickname}\u003C\u002Fdiv\u003E--\u003E\u003C!--    \u003Cdiv class=\"leaders__points\"\u003E${item.points}\u003C\u002Fdiv\u003E--\u003E\u003C!--    \u003C\u002Fdiv\u003E`).join('') +--\u003E\u003C!--'\u003C\u002Fdiv\u003E'--\u003E\u003Cdiv class=\"leaders\"\u003E";
// iterate leaders
        ;(function () {
            var $$obj = leaders;
            if ('number' == typeof $$obj.length) {
                for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                    var leader = $$obj[pug_index0];
                    pug_html = pug_html + "\u003Cdiv class=\"leaders__member\"\u003E\u003Cdiv class=\"leaders__name\"\u003E" + (pug_escape(null == (pug_interp = leader.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"leaders__points\"\u003E" + (pug_escape(null == (pug_interp = leader.points) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
                }
            } else {
                var $$l = 0;
                for (var pug_index0 in $$obj) {
                    $$l++;
                    var leader = $$obj[pug_index0];
                    pug_html = pug_html + "\u003Cdiv class=\"leaders__member\"\u003E\u003Cdiv class=\"leaders__name\"\u003E" + (pug_escape(null == (pug_interp = leader.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"leaders__points\"\u003E" + (pug_escape(null == (pug_interp = leader.points) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
                }
            }
        }).call(this);

        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }.call(this, "leaders" in locals_for_with ? locals_for_with.leaders : typeof leaders !== "undefined" ? leaders : undefined));
    ;
    return pug_html;
}

export default renderLeaderboard;