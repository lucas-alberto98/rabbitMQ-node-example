const amqp = require("amqplib")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function delay(){
    const delay_time = getRandomInt(500, 5000)
    return new Promise(resolve => setTimeout(resolve, delay_time))
}

class Rabbit{
    constructor(){
        this.connection;
        this.channel
    }

    /** 
     * Initial RabbitMQ instance connect
     */
    async init(){
        this.connection = await amqp.connect('amqp://localhost')
        console.log("CONECTADO")
        this.channel = await this.connection.createChannel()
        console.log("CANALIZADO")
    }


    /**
     * @param {string} queue Name queue in RabbitMQ.
     * @param {object} message Object to send.
     */
    async send(queue, message){
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

     /**
     * @param {string} queue Name queue in RabbitMQ.
     * @param {function} callback Function callback on received message.
     */
    async on(queue, callback){
        await this.channel.prefetch(3)
        await this.channel.consume(queue, async (msg) =>{
            try{
                await delay()
                callback(String(msg.content))
                this.channel.ack(msg)
            }catch(err){
                this.channel.nack(msg)
                console.log(err)
            }
        })
    }
}

module.exports = Rabbit