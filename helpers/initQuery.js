module.exports = function initQuery(data){
    var query  = {
        sort : data.sort ? data.sort : {"createdAt": "1"},
        from: data.from ? data.from : 0,
        size: data.size ? data.size : 10,
        query:data.query ? data.query : {}
    }
    return query;
}