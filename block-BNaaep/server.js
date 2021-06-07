var http = require('http')

var fs = require('fs')

var server = http.createServer(handleRequest)


function handleRequest(req,res){

}

server.listen(4000, ()=>{
    console.log('server listening to port 4000')
})













