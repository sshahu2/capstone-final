/*const request=require('request');
const config=require('./keys');
module.exports.functions={
    authorize:function(req,res){
        var header=config.clientId+':'+config.clientSeret;
        var encheader=new Buffer(header).toString('base64');
        var finalheader='Basic'+encheader;
        request.post('https://api.twitter.com/oauth2/token',{form:{'grant_type':'client_credentials'},
        headers:{Authorization:finalheader}},function(error,response,body){
            if(error)
            console.log(error);
            else{
                config.bearertoken=JSON.parse(body).access_token;
                res.json({success:true,data:config.bearertoken});

                }
        })
        }
        };
    
*/