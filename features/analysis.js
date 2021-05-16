const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};
const isPresent = function(array, key) {
  // if (!isArray(array)) array = []
  array.forEach(element => {
    if (element[0] == key) return true;
  });
  return false;
}
const findIndex = function(array, item) {
  // if (!isArray(array)) array = []
  array.forEach(element, index => {
    if (element[0] == item) return index;
  });
  return false;
}
module.exports = {
    analyzeSentiment: async function(text) {
    // Imports the Google Cloud client library
    
  
    // Instantiates a client
    
    // The text to analyze
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
  
    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    console.log("Returning: " + Math.round(sentiment.score * (sentiment.magnitude * 1000)))
    return (Math.round(sentiment.score * (sentiment.magnitude * 1000)));
  },
  analyzeEntities: async function(text, json) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  const [result] = await client.analyzeEntities({document});

  const entities = result.entities;

  console.log('Entities:');
  let ent = json.entities;
  if (!isArray(ent)) ent = [];
  entities.forEach(entity => {
      console.log(entity.name);
      console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      if (entity.metadata && entity.metadata.wikipedia_url) {
      console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    }
    if (isPresent(ent, entity.name)) {
      ent[findIndex(ent, entity.name)][1] += Math.round(entity.salience * 1000); 
    }
    else ent.push([entity.name, Math.round(entity.salience*1000)]);
  });
  ent.sort((a, b) => a[1] - b[1]);
  return ent;
  }
}