console.clear(); // optional

// Add Token = T++
// javascript:(function(){var search=window.location.search.slice(1);var pairs=search.length>0?search.split("&"):[];var items=pairs.reduce((map,pair)=>{var kv=pair.split("=");map[kv[0]]=kv[1]||null;return map;},{});items.token=Date.now();var keys=Object.keys(items);var params="";keys.forEach(key=>{params+=key;params+=items[key]?("="+items[key]):"";params+="&";});params=params.slice(0,-1);var location=window.location.origin+window.location.pathname;location+=params.length>0?("?"+params):"";location+=window.location.hash;window.location=location;})();
// Remove Token = T--
// javascript:(function(){var search=window.location.search.slice(1);var pairs=search.length>0?search.split("&"):[];var items=pairs.reduce((map,pair)=>{var kv=pair.split("=");map[kv[0]]=kv[1]||null;return map;},{});delete items.token;var keys=Object.keys(items);var params="";keys.forEach(key=>{params+=key;params+=items[key]?("="+items[key]):"";params+="&";});params=params.slice(0,-1);var location=window.location.origin+window.location.pathname;location+=params.length>0?("?"+params):"";location+=window.location.hash;window.location=location;})();

// Bookmarklet Crunchinator:
// http://ted.mielczarek.org/code/mozilla/bookmarklet.html

// Tests for bookmarkley:
// http://localhost:1234/pens/Token/markup.html
// http://localhost:1234/pens/Token/markup.html#hashy
// http://localhost:1234/pens/Token/markup.html?foo=bar
// http://localhost:1234/pens/Token/markup.html?foo=bar&test=two
// http://localhost:1234/pens/Token/markup.html?foo=bar&test=two&three
// http://localhost:1234/pens/Token/markup.html?foo=bar&test=two&three&token=blah
// http://localhost:1234/pens/Token/markup.html?foo=bar&test=two&three&token=blah#hashy

let search = window.location.search.slice(1);
console.log("search", search);

let pairs = search.length > 0 ? search.split("&") : [];
console.log("pairs", pairs);

let items = pairs.reduce((map, pair) => {
  let kv = pair.split("=");
  map[kv[0]] = kv[1] || null;
  return map;
}, {});
// items.token = Date.now(); // Token++, e.g. 1531068607243
delete items.token; // Token--
console.log("items", items);

let keys = Object.keys(items);
console.log("key", keys);

let params = "";
keys.forEach(key => {
  params += key;
  params += items[key] ? ("=" + items[key]) : "";
  params += "&";
});
params = params.slice(0, -1);
console.log("params", params);

let location = window.location.origin + window.location.pathname;
location += params.length > 0 ? ("?" + params) : "";
location += window.location.hash;
console.log("location", location);

// window.location = location;
