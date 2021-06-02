import language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const ty = "PLAIN_TEXT"
const isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};
 export async function analyzeSentiment(text: string) {
    // Imports the Google Cloud client library
    
  
    // Instantiates a client
    
    // The text to analyze
    const document = {
      content: text,
      // type: 'PLAIN_TEXT': language.Type,
    };
  
    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
  
    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    console.log("Returning: " + Math.round(sentiment.score * (sentiment.magnitude * 1000)))
    return (Math.round(sentiment.score * (sentiment.magnitude * 1000)));
  }
  export async function analyzeEntities(text, json) {
  const document = {
    content: text,
    // type: 'PLAIN_TEXT',
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
    // if (isPresent(ent, entity.name)) {
      // ent[findIndex(ent, entity.name)][1] += Math.round(entity.salience * 1000); 
    // }
    ent.push(entity.name.toLowerCase());
    return ent;
  });
  // ent.sort((a, b) => a[1] - b[1]);
  return ent;
  }
  export function count(array, item) {
    let count = 0;
    array.forEach(value => {
      if(value == item) count++;
    })
    return count;
  }
  export function findMost(array) {
    let counts = [];
    let values = [];
    let highest = 0;
    let highestValue;
    array.forEach(value => {
      if (values.includes(value.toString())) {
        counts[values.findIndex(this.callbck)] += 1;
      } else {
        values.push(value)
        counts.push(1);
      }
    });
    counts.forEach(function(value, index) {
      if (value > highest) {
        highest = value;
        highestValue = values[index];
      }
    });
    return highestValue;
  }
  export function callback(element, index, array) {
    return index;
  }