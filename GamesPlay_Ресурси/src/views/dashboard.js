import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllGames } from "../api/data.js";
import { gamePreview } from './common.js'

let dashboardTemplate = (game) => html`
        <section id="catalog-page">
            <h1>All Games</h1>
            ${game.length == 0 ?
                html`<h3 class="no-articles">No articles yet</h3>` :
                html`${game.map(gamePreview)}`} 
        </section>`

export async function dashboardPage(ctx) {
    let game = await getAllGames()
    ctx.render(dashboardTemplate(game))
}