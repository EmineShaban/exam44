import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteGames, getAllComments, getGameById, createComment} from '../api/data.js';
import { getUserData } from "../util.js";
import {comm} from './common.js'
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';


const detailsTamplate = (game, onDelete, isOwner, onComment, comment) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                    ${game.length == 0 ? html`<p class="no-comment">No comments.</p>` : 
                    html`${repeat(comment, c => c._id, comm)}
`
                
                }
                </div>

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                <div class="buttons">
                ${isOwner ? html`<a href="/edit/${game._id}" class="button">Edit</a>
                    <a href="javascript:void(0)" @click=${onDelete} class="button">Delete</a>` : ''}
             
                </div>
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            ${!isOwner ? html` <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onComment} class="form">
                    <textarea name="comment" placeholder='Comment......'></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>` : ''}
            
        </section>`


export async function detailsPage(ctx) {
    let game = await getGameById(ctx.params.id)
    let comment = await getAllComments(game)
    // let comment1 = comment.gameId
    // let addComm = await createComment(game)
    let userData = getUserData()
    const isOwner = userData && userData.id == game._ownerId;  
    ctx.render(detailsTamplate(game, onDelete, isOwner, onComment, comment))
// console.log(comment._ownerId)
// console.log(userData.id)
    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteGames(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
  
            async function onComment(event) {

                // async function onComment(data, form) {
                //     await createComment(game, data.content);
                //     form.reset();
                // ctx.page.redirect(`/details/${ctx.params.id}`);
                event.preventDefault();
                const formData = new FormData(event.target);
        
                const createComm = {
                    game,
                    commentText: formData.get('comment').trim()
                }
        
                if (Object.values(createComm).some(x => !x)) {
                    return alert('All fields are required!');
                }
                await createComment(createComm)

                // await addComm(game, createComment);
                event.target.reset();
                ctx.page.redirect(`/details/${ctx.params.id}`);
            }
    }
  