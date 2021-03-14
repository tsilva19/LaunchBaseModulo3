const express = require('express')
const nunjucks = require('nunjucks')

const videos = require("./data")

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    nocache: true
})


server.get("/",function(req,res){
    const index = {
        avatar_url: "https://avatars2.githubusercontent.com/u/39628806?s=460&u=6d8a7db5029545fc03d12cf6623d41eca5cd4b3e&v=4",
        name: "Thiago Alves",
        role: "Programador",
        description: 'Programador FullStack, trabalha na Gft, colaborador da <a href="https://www.gft.com/br/pt/index/" target="_blank">GFT</a>',
        links : [
            {name: "Github", url:"https://github.com/tsilva19" },
            {name: "Twitter", url:"https://twitter.com" },
            {name: "Linkdin", url:"https://www.linkedin.com" }
        ]
    }

    return res.render("index", { index })
})

server.get("/classes",function(req,res){
    return res.render("classes", { items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id

    })
    if(!video) {
        return res.send("Video NOT FOUND !!!")
    }

   return res.render("video", { item: video })

})

server.listen(5000, function() {
    console.log("Server esta rodando")
})