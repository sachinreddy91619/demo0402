

import fastify from 'fastify';

const registerUserSchema = {
    body: {
        type: 'object',
        required: ['username', 'email', 'password', 'role'],
        properties: {
            username: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string' }
        }
    },
};

export default registerUserSchema;

