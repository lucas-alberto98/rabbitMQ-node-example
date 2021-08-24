const Express = require('express')
const Http = require('http');
const routes = require('./routes');
const Rabbit = require('./utils/RabbitMQ')
const port = 3000

class App{
  constructor(){
    this.server = Express()
    this.rabbit = new Rabbit()
    
    
    this.init()
    this.middlewares();
    this.routes();
  }

  async init(){
    await this.rabbit.init()
    await this.rabbit.on("mensagens", (msg) => console.log(msg))
  }

  middlewares() {
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: true }));
    this.server.use((req, res, next) => {
      req.rabbit = this.rabbit
      return next()
    } )
  }

    routes() {
      this.server.use(routes);
  }
}

const appContainer = new App().server;
const server = Http.createServer(appContainer);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})