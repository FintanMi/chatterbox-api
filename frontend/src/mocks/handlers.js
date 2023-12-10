const baseURL = "https://chatterbox-app-371a8887d852.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json());
    })
];