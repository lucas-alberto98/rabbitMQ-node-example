const Rabbit = require('./utils/RabbitMQ')

async function main(){
    const rabbit = new Rabbit()
    await rabbit.init()
    await rabbit.on("mensagens", (msg) => console.log(msg))
}

main()