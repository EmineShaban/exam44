import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllGames } from "../api/data.js";
import { gamePreviewKratko } from './common.js'

let homeTemplate = (game) => html` 

<section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">
<div id="home-page">
    <h1>Latest Games</h1>
    ${game.length == 0 ?
    html`<p class="no-articles">No games yet</p>` :
    html`${game.map(gamePreviewKratko)}`
    }
</div>
</section>
`





                    //     <img src=${game.imageUrl}>
                    // </div>
                    // <h3>${game.title}</h3>
                    // <div class="rating">
                    //     ${game.maxLevel}
   

export async function homePage(ctx) {
    let game = await getAllGames()
    ctx.render(homeTemplate(game))
}


// export async function homePage(ctx){
//     let books = await getAllBooks()
//     ctx.render(homeTemplate(books))
