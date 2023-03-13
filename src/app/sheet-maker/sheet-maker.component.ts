import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sheet-maker',
  templateUrl: './sheet-maker.component.html',
  styleUrls: ['./sheet-maker.component.css']
})
export class SheetMakerComponent implements OnInit {

  questionJson:any;
  questionsArray:any[];
  optionsJson:any[];
  optionsKeyMap:Map<number,string>;
  addButtonDisabled:boolean;
  errorMessage:string;

  constructor() { 

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
      marks:""
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
    this.optionsJson.push({
      optionKey:this.getOptionKeyFromIndex(this.optionsJson.length),
      optionVal:""
    })
    this.checkConditions();
  }

  onClickRemove(index:number){
    this.optionsJson.splice(index,1);
    this.checkConditions();
  }

  getOptionKeyFromIndex(index:number):string{
    let result = this.optionsKeyMap.get(index);
    return result??"A";
    this.checkConditions();
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
  }

  onFocusOutMarks(value:string){
    this.questionJson.marks = value;
    this.checkConditions();
  }

  onFocusOutExplain(value:string){
    this.questionJson.correctAnsExplain = value;
    this.checkConditions();
  }

  onCorrectOptionFocusOut(value:string){
    this.questionJson.correctOptionKey = value;
    this.checkConditions();
  }

  onClickReset(){
    this.questionJson = {
      question:"",
      answers:[],
      correctOptionKey:"",
      correctAnsExplain:"",
      marks:""
    };

    this.optionsJson = [];
    this.checkConditions();
  }

  onClickAddQuestion(){
    let question = this.questionJson;
    this.questionsArray.push(question);
    this.onClickReset();
    this.checkConditions();
  }

  onClickStartOver(){
    this.questionsArray = [];
    this.onClickReset()
  }

  

}
