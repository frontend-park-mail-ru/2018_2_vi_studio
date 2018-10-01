(function () {
    const noop = () => null;

    class CookieModule {
        getCookie(name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }

        setCookie(name, value) {
            document.cookie = name+'='+value;
        }
    }

    window.CookieModule = new CookieModule();
})();
