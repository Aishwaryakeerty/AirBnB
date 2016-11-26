/**
 * Created by harshmehta6711 on 22-11-2016.
 */

var mysql=require('../AirbnbBackend/services/mysql');
var mq_client = require('../rpc/client');

exports.getDetails=function (req,res)
{
    var msg_payload={
        proname: req.param('proname'),
        date: req.param('')
    }

    mq_client.make_request('login_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.statusCode === 200){
                console.log("valid Login");
                req.session.fname=results.fname;
                res.send({"login":"Success", "statusCode":200, "fname": results.fname});
                console.log("success");
            }
            else {

                console.log("Invalid Login");
                res.send({"login":"Fail"});
            }
        }
    });

};