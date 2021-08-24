module.exports.store = async function(req, res){
    await req.rabbit.send("mensagens", {ok : true})
    return res.json({ok : true})
}