var LRU = require("lru-cache")  

var options = { max: 500
  , length: function (n, key) { return n * 2 + key.length }
  
  , maxAge: 1000 *65 }


export const cache = new LRU(options )


//var otherCache = new LRU(50)