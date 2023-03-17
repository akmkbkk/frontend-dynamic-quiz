import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sheet-maker',
  templateUrl: './sheet-maker.component.html',
  styleUrls: ['./sheet-maker.component.css']
})
export class SheetMakerComponent implements OnInit {

  questionJson:any;
  changedAttribute:string;
  questionsArray:any[];
  optionsJson:any[];
  optionsKeyMap:Map<number,string>;
  addButtonDisabled:boolean;
  errorMessage:string;
  componentMsg:string;
  downloadFileLengthOkay:boolean;

  constructor() { 

    

    this.componentMsg = "Sheet Maker";

    this.addButtonDisabled = true;

    this.optionsJson = [
      
    ];

    this.questionsArray = [

    ];

    this.questionJson = {
      question:"",
      answers:this.optionsJson,
      correctOptionKey:"",
      correctAnsExplain:"",
      marks:null
    }

    this.errorMessage = "";

    this.optionsKeyMap = new Map<number,string>([
      [0,"A"],
      [1,"B"],
      [2,"C"],
      [3,"D"],
      [4,"E"]
    ]
    );

    this.changedAttribute="";
    this.downloadFileLengthOkay = false;
  }

  ngOnInit(): void {
  }

  checkConditions(){
    if(this.questionJson.question=="" ){
      this.addButtonDisabled = true;
      this.errorMessage = "Question field should not be blank!"
    }else if(this.questionJson.answers.length==0){
      this.addButtonDisabled = true;
      this.errorMessage = "Answers list should not be empty!"
    }else if(this.questionJson.marks==""){
      this.addButtonDisabled = true;
      this.errorMessage = "Marks should not be empty!"
    }else if(this.questionJson.correctOptionKey==""){
      this.addButtonDisabled = true;
      this.errorMessage = "Correct Option should not be empty!"
    }else if(this.questionJson.correctAnsExplain==""){
      this.addButtonDisabled = true;
      this.errorMessage = "Answer explanation should not be empty!"
    }else{
      this.addButtonDisabled = false;
      this.errorMessage = ""
    }
  }

  onClickAddRow(){
    if(this.optionsJson.length<= 3){
      this.optionsJson.push({
        optionKey:this.getOptionKeyFromIndex(this.optionsJson.length),
        optionVal:""
      })
    }

    this.changedAttribute="optionsJson";
    this.checkConditions();
  }

  onClickRemove(index:number){
    this.optionsJson.splice(index,1);
    this.checkConditions();
  }

  getOptionKeyFromIndex(index:number):string{
    let result = this.optionsKeyMap.get(index);
    return result??"A";
  }

  onFocusOut(index:number,value:string){
    this.optionsJson[index] = {
      optionKey:this.getOptionKeyFromIndex(index),
      optionVal:value
    }
    this.questionJson.answers = this.optionsJson;
    this.checkConditions();

  }

  onFocusOutQuestionArea(value:string){
    this.questionJson.question = value;
    this.checkConditions();
    this.changedAttribute="question";
  }

  onFocusOutMarks(value:string){
    this.questionJson.marks = Number(value);
    this.checkConditions();
    this.changedAttribute="marks";
  }

  onFocusOutExplain(value:string){
    this.questionJson.correctAnsExplain = value;
    this.checkConditions();
    this.changedAttribute="correctAnsExplain";
  }

  onCorrectOptionFocusOut(value:string){
    this.questionJson.correctOptionKey = value;
    this.checkConditions();
    this.changedAttribute="correctOptionKey";
  }

  onClickReset(){
    this.optionsJson = [];
    this.questionJson = {
      question:"",
      answers:this.optionsJson,
      correctOptionKey:"",
      correctAnsExplain:"",
      marks:null
    };
    this.checkConditions();
    this.downloadFileLengthOkay = false;
    this.changedAttribute="";
  }

  onClickAddQuestion(){
    let question = this.questionJson;
    this.questionsArray.push(question);
    this.onClickReset();
    this.checkConditions();
  }

  onClickStartOver(){
    this.questionsArray = [];
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.onClickReset()
  }

  onClickSaveFile(downloadFileName:string){
    let element:HTMLElement;
    element = document.createElement('a');
    const fileType = 'text/json';
    element.setAttribute('href',`data:${fileType};charset=utf-8,${encodeURIComponent(JSON.stringify(this.questionsArray,null,2))}`);
    element.setAttribute('download', downloadFileName.split(".")[0]+".json");
    var event = new MouseEvent("click");
    element.dispatchEvent(event);

  }

  onInputDownloadFileName(downloadFileName:string){
    if(downloadFileName.length>4 && downloadFileName.indexOf(".")==-1){
      this.downloadFileLengthOkay = true;
    }
  }

}
