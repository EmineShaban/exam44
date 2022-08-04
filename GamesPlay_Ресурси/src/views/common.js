import { html } from "../../node_modules/lit-html/lit-html.js";

export const gamePreview = (game) => html`

<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>
`

export const gamePreviewKratko = (game) => html`
        <div class="game">
            <div class="image-wrap">
                <img src=${game.imageUrl}>
            </div>
            <h3>${game.title}</h3>
            <div class="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div class="data-buttons">
                <a href='/details/${game._id}' class="btn details-btn">Details</a>
            </div>
        </div>`

export const comm = (comen) => html`
            <ul>
                <li class="comment">
                    <p>${comen.gameId.commentText}</p>
                </li>
            </ul>`



// {
//     title,
//     category,
//     maxLevel,
//     imageUrl,
//     summary
//   }