import { urlOne,urlTwo,urlThree,urlFour,urlFive,urlSix } from '../settings';
import { shuffle } from '../helpers/shuffle'
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
    var urlList = [urlOne,urlTwo,urlThree,urlFour,urlFive,urlSix];
    var combinationList = [];
    var count = 0;


    for (var url in urlList){
      parser.parseURL(urlList[url],   function(err, feed) {
        
        var jsonArray = feed.items;

        for (var item in jsonArray){         
          var str = jsonArray[item].encodedContent; 
          var dom = new jsdom.JSDOM(str);
          if (dom.window.document.querySelector("img") != undefined){
            var src = dom.window.document.querySelector("img").getAttribute('src');
            jsonArray[item].imageUrl = src;
          }
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
        combinationList = combinationList.concat(jsonArray);
        count ++;
        if (count === urlList.length){
          combinationList = shuffle(combinationList);
          res.json(combinationList);
        }
        
      })
    }
}
    