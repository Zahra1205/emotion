var prediction_1="";
var prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function Take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='snapshot' src='"+data_uri+"'>";
    });
}
console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MW6bbcj96/model.json",model_loded);
function model_loded(){
    console.log("model loded");
}
function speak(){
    var synth=window.SpeechSynthesis;
    var speak_data1="The first prediction is "+prediction_1;
    var speak_data2=" and the second prediction is "+prediction_2;
    var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utter_this);
}
function check(){
    var img =document.getElementById("snapshot");
    classifier.classify(img ,gotResults);
}
function gotResults(error, result){
if(error){
    console.log(error);
}
else{
    console.log(result);
    document.getElementById("result_emotionName1").innerHTML=result[0].label;
    document.getElementById("result_emotionName2").innerHTML=result[1].label;
    prediction_1=result[0].label;
    prediction_2=result[1].label;
    speak();
    if(prediction_1=="happy"){
        document.getElementById("update_emoji1").innerHTML="&#128516;";
    }
    if(prediction_1=="sad"){
        document.getElementById("update_emoji1").innerHTML="&#128549;";
    }
    if(prediction_1=="crying"){
        document.getElementById("update_emoji1").innerHTML="&#128544;";
    }
    if(prediction_2=="happy"){
        document.getElementById("update_emoji1").innerHTML="&#128516;";
    }
    if(prediction_2=="sad"){
        document.getElementById("update_emoji1").innerHTML="&#128549;";
    }
    if(prediction_2=="crying"){
        document.getElementById("update_emoji1").innerHTML="&#128544;";
    }
}
}
