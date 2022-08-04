{/* <script type="module" src="./src/app.js"></script> */}
{/* <a href="javascript:void(0)" id="logoutBtn">Logout</a> */}


import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { logoutB } from "./api/api.js";
import { getUserData } from './util.js';
import { loginPage } from "./views/login.js";
import { registerPage } from './views/register.js';
import { dashboardPage } from './views/dashboard.js';
import { homePage } from './views/home.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
// import { searchPage } from './views/search.js';
import { detailsPage } from './views/details.js';
// import { myPostPage } from './views/myBook.js';

let root = document.getElementById('main-content')

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav()
    next()
}

function updateUserNav() {
    const user = getUserData()
    if (user) {
      document.getElementById('user').style.display = 'inline';
      document.getElementById('guest').style.display = 'none';
    } else {
      document.getElementById('user').style.display = 'none';
      document.getElementById('guest').style.display = 'inline';
    }
  }

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    logoutB()
    updateUserNav()
    page.redirect('/')
})

page(decorateContext)
page('/login', loginPage)
page('/register', registerPage)
page('/', homePage)
page('/catalogue', dashboardPage)
page('/create', createPage)
page('/edit/:id', editPage)
// page('/search', searchPage)
page('/details/:id', detailsPage)

updateUserNav()
page.start()