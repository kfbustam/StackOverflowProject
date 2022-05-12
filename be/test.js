var chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)
var app = require('./index');
var expect = chai.expect;

var agent = chai.request.agent(app);

describe("Post Signin",()=>{
    it('/api/auth/login`',(done)=>{
        chai.request.agent(app)
        .post('/api/auth/login')
        .send({"email":"admin@gmail.com", "password":"admin123"})
        .then(function (res){
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
        });
    })
})


describe("Get User reputation",()=>{
  it('/api/user/getReputationHistory/6270916b10d71bab3c5630fe',(done)=>{
      chai.request.agent(app)
      .get('/api/user/getReputationHistory/6270916b10d71bab3c5630fe')
    
      .then(function (res){
          console.log(res.status);
          expect(res).to.have.status(200);
          done();
      })
      .catch((e) => {
          done(e);
      });
  })
})

describe("Get question by id",()=>{
    it('/api/question/getById/6275d5f3b319fc3904964e84',(done)=>{
        chai.request.agent(app)
        .get('/api/question/getById/6275d5f3b319fc3904964e84')
      
        .then(function (res){
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
        });
    })
  })

  

  describe("Get all questions",()=>{
    it('/api/question/getAllQuestions',(done)=>{
        chai.request.agent(app)
        .get('/api/question/getAllQuestions')
      
        .then(function (res){
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
        });
    })
  })




describe("Post already existing user register",()=>{
    it('/api/auth/register`',(done)=>{
        chai.request.agent(app)
        .post('/api/auth/register')
        .send({"email":"admin@gmail.com", "password":"admin123"})
        .then(function (res){
            expect(res).to.have.status(400);
            done();
        })
        .catch((e) => {
            done(e);
        });
    })
})





