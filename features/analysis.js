const language = require('@google-cloud/language');
module.exports = {
    analysis: async function(text) {
    // Imports the Google Cloud client library
    
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();
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
    console.log("Returning: " + sentiment.score * sentiment.magnitude)
    return (sentiment.score * sentiment.magnitude);
  }}