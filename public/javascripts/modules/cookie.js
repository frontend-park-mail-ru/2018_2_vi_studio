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

        clean() {
            let cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }

    }

    window.CookieModule = new CookieModule();
})();
