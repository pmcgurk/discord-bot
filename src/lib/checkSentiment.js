const Sentiment = require('sentiment');
const sentiment = new Sentiment();

export default function checkSentiment(msg) {
  return sentiment.analyze(msg.content);
}
