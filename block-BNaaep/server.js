var http = require('http')

var fs = require('fs')

var qs = require('querystring')

var server = http.createServer(handleRequest)

var usersPath = __dirname + '/contacts/'

function handleRequest(req,res){
    var store = ''
    req.on('data', (chunk)=>{
        store = store + chunk
    })
    if(req.method === 'GET' && req.url === '/'){
        res.setHeader('Content-type','text/html')
        fs.readFile('./index.html',(err,content) =>{
            if(err)console.log(err)
            else{
                res.end(content)
            }
        })
    }   else if (req.method === 'GET' && req.url === '/about'){
        res.setHeader('Content-type','text/html')
        fs.readFile('./about.html',(err,content) =>{
            if(err)console.log(err)
            else{
                res.end(content)
            }
        })
    } else if(req.url.split('.').pop() === 'css') {
        // set header for css file
        res.setHeader('Content-Type', 'text/css');
        // read css file and send it in response
        fs.readFile('./assets/stylesheet/style.css', (err, content) => {
          if(err) return console.log(err);
          res.end(content)
        })
      } else if(req.url.split('.').pop() === 'jpg') {
        // set header for css file
        res.setHeader('Content-Type', 'image/jpg');
        // read css file and send it in response
        fs.readFile('./assets/img/random.jpg', (err, content) => {
          if(err) return console.log(err);
          res.end(content)
        })
      }
      req.on('end',()=>{
          if(req.url === '/contact' && req.method === 'GET'){
              res.setHeader('Content-type','text/html')
              fs.readFile('./contact.html',(err,content) =>{
                if(err)console.log(err)
                else{
                    res.end(content)
                }
            })
          } else if(req.url === '/form' && req.method === 'POST'){
              var username = qs.parse(store).username
              fs.open(usersPath + username + '.json', 'wx',(err, fd)=>{
                  if(err) return console.log('username taken')
                  fs.writeFile(fd, store, (err)=>{
                      if(err) return console.log(err)
                      fs.close(fd, ()=>{
                          
                          res.end('contacts saved')
                      })
                  })
              })
          }
      })
}   

server.listen(4000, ()=>{
    console.log('server listening to port 4000')
})













