import { rest } from 'msw';

const baseURL = "https://chatterboxapi-3494af6fad30.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json());
    })
];