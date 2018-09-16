const root = document.getElementById('root');
const section = document.createElement('section');


const pages = {
    home: {title: 'Home', handler: renderHome},
    sign_in: {title: 'Sign in', handler: renderSignIn},
    sign_up: {title: 'Sign up', handler: renderSignUp},
    leaders: {title: 'Leaders', handler: renderLeaders},
    rules: {title: 'Rules', handler: renderRules}
};

function renderHome() {
    section.innerHTML = `
<div class="section__video">
    <div class="video">
        <!--Кнопка youtube-->
        <button class="video__button" aria-label="Смотреть">
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path class="ytp-large-play-button-bg"
                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                    fill="#212121" fill-opacity="0.8"></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
        </button>
    </div>
</div>`;
}


function renderSignIn() {
    const formElement = createForm([
        {label: 'Username', name: 'username', type: 'text'},
        {label: 'Password', name: 'password', type: 'text'},
        {label: 'Sign in', type: 'submit'},
    ]);
    formElement.classList.add('login');

    section.appendChild(formElement);
}

function renderSignUp() {
    const formElement = createForm([
        {label: 'Username', name: 'login', type: 'text'},
        {label: 'E-mail', name: 'email', type: 'email'},
        {label: 'Password', name: 'password', type: 'password'},
        {label: 'Repeat password', name: 'rep-password', type: 'password'},
        {label: 'Sign up', type: 'submit'},
    ]);
    formElement.classList.add('login');

    section.appendChild(formElement);
}

function renderLeaders() {
    const leaders = document.createElement('div');
    leaders.classList.add('leaders');

    const leaderList = [
        {name: 'ViewSharp', points: 3810},
        {name: 'MurMurt', points: 3165},
        {name: 'SchadkoAO', points: 2431},
        {name: 'FakeName', points: 2185},
        {name: 'FakeName', points: 1945},
        {name: 'FakeName', points: 1924},
        {name: 'FakeName', points: 1842},
        {name: 'FakeName', points: 1728},
    ];

    leaders.innerHTML = leaderList.map((item)=>`
<div class="leaders__member">
    <div class="leaders__name">${item.name}</div>
    <div class="leaders__points">${item.points}</div>
</div>`).join('');

    section.appendChild(leaders);
}

function renderRules() {
    const rules = document.createElement('div');
    rules.classList.add('rules');

    rules.innerHTML = `
<h1>Правила игры</h1>
<p>Мы скоро их придумаем</p>`;

    section.appendChild(rules);
}

function main() {
    // Background
    const backgroundElement = document.createElement('div');
    backgroundElement.classList.add('background');
    backgroundElement.innerHTML = '<div class="background__filter"></div>';

    // Header
    const headerElement = document.createElement('header');
    headerElement.classList.add('header');
    headerElement.innerHTML = '<img class="header__image" src="/public/images/Group%206@2x.png" alt="">';

    // Section
    section.classList.add('section');
    renderHome();

    // Navigation
    const navigationElement = createNavigation();

    // Content
    const rootContentElement = document.createElement('div');
    rootContentElement.classList.add('root__content');
    rootContentElement.appendChild(headerElement);
    rootContentElement.appendChild(section);

    root.appendChild(backgroundElement);
    root.appendChild(rootContentElement);
    root.appendChild(navigationElement);
}

main();

function createNavigation() {
    const navElement = document.createElement('nav');
    navElement.classList.add('navigation');
    navElement.innerHTML = `<div class="navigation__content">${Object.entries(pages)
        .map((item) => `<a class="navigation__item" href="${item[0]}" data-href="${item[0]}">${item[1].title}</a>`)
        .join('')
        }</div>`;
    return navElement;
}

function createForm(inputs) {
    const formElement = document.createElement('form');
    formElement.innerHTML = inputs.map(
        (item) => item.type === 'submit' ?
            `<input type="${item.type}" value="${item.label}" class="button">` :
            `<div class="field">
                <input type="${item.type}" name="${item.name}" class="field__input">
                <label class="field__name">${item.label}</label>
            </div>`
    ).join('');
    return formElement;
}

root.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) {
        return;
    }

    event.preventDefault();
    const link = event.target;

    console.log({
        href: link.href,
        dataHref: link.dataset.href
    });

    section.innerHTML = '';

    pages[link.dataset.href].handler();
});