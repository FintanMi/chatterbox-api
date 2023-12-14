import { rest } from 'msw';

const baseURL = "/api";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json(
            {
                pk: 4,
                username: "gael",
                email: "",
                first_name: "",
                last_name: "",
                profile_id: 4,
                profile_image:
                    "https://res.cloudinary.com/divt5ho9l/image/upload/v1696675419/default_profile_rgmftz.jpg",
            }
        ));
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    })
];


