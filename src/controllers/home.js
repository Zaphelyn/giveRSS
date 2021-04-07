import { urlOne,urlTwo,urlThree,urlFour,urlFive,urlSix } from '../settings';
import Parser from 'rss-parser';
import jsdom from 'jsdom';


export const indexPage = (req, res) => {
    var parser = new Parser({
      customFields: {
        item: [
          ['content:encoded','encodedContent'],
        ]
      }
    });
    parser.parseURL(urlOne,   function(err, feed) {
      
      var jsonArray = feed.items;

      for (var item in jsonArray){
        var str = jsonArray[item].encodedContent;
        var dom = new jsdom.JSDOM(str);
        var src = dom.window.document.querySelector("img").getAttribute('src');
        jsonArray[item].imageUrl = src;
        delete jsonArray[item]['content:encoded'];
        delete jsonArray[item]['content:encodedSnippet'];
        delete jsonArray[item]['dc:creator'];
        delete jsonArray[item]['encodedContent'];
        delete jsonArray[item]['comments'];
        delete jsonArray[item]['content'];
        delete jsonArray[item]['contentSnippet'];
        delete jsonArray[item]['guid'];
        delete jsonArray[item]['categories']
      }
      res.json(jsonArray);
  })
}
    