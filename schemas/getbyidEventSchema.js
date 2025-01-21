const fastify =require('fastify')({

    logger:true
})

const getbyidEventSchema = { 
    params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
        }
      },

}

module.exports = getbyidEventSchema;