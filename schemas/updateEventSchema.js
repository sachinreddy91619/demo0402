

const updateEventSchema = {
  body: {
    type: 'object',
    // required: ['eventname', 'eventdate', 'eventlocation', 'amountrange', 'eventtime'],
    properties: {
      eventname: { type: 'string' },
      eventdate: { type: 'date', format: 'date' },
      eventlocation: { type: 'string' },
      amountrange: { type: 'number' },
      eventtime: { type: 'time', format: 'time' }
    }
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
    }
  }
};

export default updateEventSchema;
