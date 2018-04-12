const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const conn=require('./user-direct');
var assessSchema=new Schema({
        id:Number,
        title:String,
        score:Number,
        domain:[
            {
                id_id:Number,
                title:String,
                description:String,
                dom_score:Number,
                sub_domain:[
                    {
                        id_id_id:Number,
                        title:String,
                        sub_score:Number,
                        question:[String],
                        scoring_model:[Number]
                    }
                ] 
            }
        ]
});

const Assessmentm=mongoose.model('assessmentm',assessSchema);
// const Domainm=mongoose.model
// const Subdomainm=mogoose.model

var doms1=new Assessmentm();

      doms1.id=1,
      doms1.title="Assessment No. 1",
      doms1.score=0
      
doms1.domain=[
        {
          "id_id":1,
          "title":"Domain A",
          "description":"A kjakskas hbasjk ",
          "dom_score":0,
          
        }/*,
        {
            "id_id": 2,
            "title":"Domain B",
            "about":"B kjakskas hbasjk ",
            "sub_score":0,
            
          },
          {
            "id_id": 3,
            "title":"Domain C",
            "about":"c kjakskas hbasjk ",
            "sub_score":0,
            
          }*/];
          doms1.domain[0].sub_domain=[{
           id_id_id:1,
           title:"sub domain XYZ1",
           sub_score:"0",   
          }/*,
          {
            id_id_id:2,
           title:"sub domain XYZ2",
           sub_score:"0",  
          },
          {
              id_id_id:3,
           title:"sub domain XYZ3",
           sub_score:"0",
          }*/
          ];
          doms1.domain[0].sub_domain[0].question=["vjakdsdjk0","vhjabd0k"];
          doms1.domain[0].sub_domain[0].scoring_model=[95,5];
      /*    doms1.domain[0].sub_domain[1].question=["vjakdsdj1","vhjabd1","jksjfk1"];
          doms1.domain[0].sub_domain[1].scoring_model=[90,5,5];
          doms1.domain[0].sub_domain[2].question=["vjakdsdj3","vhjabd3","vjhbjke5"];
          doms1.domain[0].sub_domain[2].scoring_model=[65,30,5];*/
      
 

 
doms1.save(function(err,assessment){
    if(err){
    console.log(error);}
    else{
console.log(assessment)}});
var doms2=new Assessmentm();

      doms2.id=2,
      doms2.title="Assessment No. 2",
      doms2.score=0
      
doms2.domain=[
        {
          "id_id":1,
          "title":"Domain b",
          "description":"A kjakskas hbasjk ",
          "dom_score":0,
          
        }/*,
        {
            "id_id": 2,
            "title":"Domain B",
            "about":"B kjakskas hbasjk ",
            "sub_score":0,
            
          },
          {
            "id_id": 3,
            "title":"Domain C",
            "about":"c kjakskas hbasjk ",
            "sub_score":0,
            
          }*/];
          doms2.domain[0].sub_domain=[{
           id_id_id:1,
           title:"sub domain XYZ1",
           sub_score:"0",   
          }/*,
          {
            id_id_id:2,
           title:"sub domain XYZ2",
           sub_score:"0",  
          },
          {
              id_id_id:3,
           title:"sub domain XYZ3",
           sub_score:"0",
          }*/
          ];
          doms2.domain[0].sub_domain[0].question=["vjakdsdjk0","vhjabd0k"];
          doms2.domain[0].sub_domain[0].scoring_model=[95,5];
      /*    doms1.domain[0].sub_domain[1].question=["vjakdsdj1","vhjabd1","jksjfk1"];
          doms1.domain[0].sub_domain[1].scoring_model=[90,5,5];
          doms1.domain[0].sub_domain[2].question=["vjakdsdj3","vhjabd3","vjhbjke5"];
          doms1.domain[0].sub_domain[2].scoring_model=[65,30,5];*/
      
 

 
doms2.save(function(err,assessment){
    if(err){
    console.log(error);}
    else{
console.log(assessment)}});
module.exports=Assessmentm;

module.exports.getAssessmentById=function(id,callback){
    Assessmentm.findById(id,callback);
}

module.exports.getAssessmentByAssessmentname = function(username, callback){//yet doubt
  const query = {username: username}
     Assessmentm.findOne(query, callback);
}
module.exports.addAssessment=function(err,callback){
   
            if(err) {
                console.log("not done");
            }
            else{
   
            newAssessment.save(callback);//using doc to save rather Model
        
}
}

