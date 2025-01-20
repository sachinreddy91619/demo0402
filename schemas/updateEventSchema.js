

const updateEventSchema = {
    body: {
      type: 'object',
      required: ['eventname', 'eventdate', 'eventlocation', 'amountrange','eventtime'], 
      properties: {
        eventname:{type:'string'},
            eventdate:{type:'date',format:'date'},
            eventlocation:{type:'string'},
            amountrange:{type:'number'},
            eventtime:{type:'time',format:'time'}
      } 
    },  
  };        

  module.exports = updateEventSchema;   