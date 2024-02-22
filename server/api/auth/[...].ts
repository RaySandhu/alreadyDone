// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
    pages: {
        // Change the default behavior to use `/login` as the path for the sign-in page
        signIn: '/login',
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GoogleProvider.default({
            clientId: runtimeConfig.public.GOOGLE_CLIENT_ID, // Ensure id and secret are put into .env file.
            clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            },
        },
        }),
    ],
})