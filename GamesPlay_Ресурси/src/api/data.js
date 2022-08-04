import * as api from "./api.js"

export const login = api.login
export const register = api.register
export const logout = api.logoutB

export async function getAllGames(){
    return api.get('/data/games?sortBy=_createdOn%20desc')
}

export async function getGameById(id){
    return api.get(`/data/games/${id}`)
}

export async function getMyToys(userId){
    return api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function createGame(game){
    return api.post('/data/games', game)
}

export async function editGame(id, toy){
    return api.put('/data/games/' + id, toy)
}

export async function deleteGames(id){
    return api.del('/data/games/' + id)
}

export async function likeToy(bookId){
    return api.post('/data/likes/', {
    bookId
    })
}

export async function searchToy(query){
    return api.get('/data/books?where=' + encodeURIComponent(`title LIKE "${query}"`))
}


export async function donationPet(petId) {
    return await api.post(`/data/donation`, petId);
}

export async function getTotalDonationCount(petId) {
    return await api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}


export async function didUserDonation(petId, userId){
    return await api.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}


export async function getAllComments(gameId) {
    return await api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}


export async function createComment(gameId, comment){
    return await api.post(`/data/comments`,{
        gameId,
        comment
    });
}


// const endpoints = {
//     byCarId: (carId) => `/data/comments?where=gameId%3D%22${carId}%22`,
//     create: '/data/comments'
// };

// export async function getAllComments(carId) {
//     return api.get(endpoints.byCarId(carId));
// }

// export async function createComment(carId, content) {
//     const comment = {
//         carId,
//         content
//     };
//     return api.post(endpoints.create, comment);
// }