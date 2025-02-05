

import fastify from 'fastify';
const app = fastify({
    logger: true
});

const posteventidSchema = {
    body: {
        type: 'object',
        required: ['eventname'],
        properties: {
            eventname: { type: 'string' }
        }
    },
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
        }
    },
};

export default posteventidSchema;
