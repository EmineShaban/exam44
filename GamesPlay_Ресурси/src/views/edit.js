import { html } from '../../node_modules/lit-html/lit-html.js';
import { editGame, getGameById } from '../api/data.js';

const editTemplate = (game, onSubmit) => html`
 <section id="edit-page" class="auth">
            <form @submit=${onSubmit} id="edit">
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value='${game.title}'>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value="${game.category}">

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value="${game.maxLevel}">

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value="${game.imageUrl}">

                    <label for="summary">Summary: </label>
                    <textarea name="summary" id="summary"> ${game.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
`;
export async function editPage (ctx) {
    const gameId = ctx.params.id;

    const game = await getGameById(gameId);
    ctx.render(editTemplate(game, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const editGamee = {
            title: formData.get('title').trim(),
            category: formData.get('category').trim(),
            maxLevel: formData.get('maxLevel').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            summary: formData.get('summary').trim()
        }

        if (Object.values(editGamee).some(x => !x)) {
            return alert('All fields are required!');
        }

        await editGame(gameId, editGamee);
        event.target.reset();
        ctx.page.redirect(`/details/${gameId}`);
    }
}

// export async function editPage(ctx) {
//     const id = ctx.params.id;
//     const pet = await getPetById(id);

//     ctx.render(editTemplate(pet, onSubmit));

//     async function onSubmit(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const pet = {
//             name: formData.get('name').trim(),
//             breed: formData.get('breed').trim(),
//             age: formData.get('age').trim(),
//             weight: formData.get('weight').trim(),
//             image: formData.get('image').trim(),
//         }

//         if (Object.values(pet).some(x => !x)) {
//             return alert('All fields are required!');
//         }

//         await editToy(id, pet);
//         event.target.reset();
//         ctx.page.redirect('/details');
//     }
// }

