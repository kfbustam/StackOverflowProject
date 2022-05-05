require("dotenv").config();
var connection =  new require('./kafka/Connection');
//topics files
var Answer = require('./kafka-controllers/answer.js');
var Authctrl = require('./kafka-controllers/authctrl.js');
var Navbar = require('./kafka-controllers/navbar.js');
var Question = require('./kafka-controllers/question.js');
var Tag = require('./kafka-controllers/tag.js');
var User = require('./kafka-controllers/user.js');

const InitiateMongoServer = require("./config/mongo/mongodb")
InitiateMongoServer()

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request


//handleTopicRequest("answer",Answer);
//handleTopicRequest("authctrl",Authctrl);
handleTopicRequest("navbar",Navbar);
handleTopicRequest("question",Question);
//handleTopicRequest("tag",Tag);
//handleTopicRequest("user",User);




