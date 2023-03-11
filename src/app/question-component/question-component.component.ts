import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../data.service';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.css']
})
export class QuestionComponentComponent implements OnInit {

  title = 'AP Tests';

  currentQuestionIndex:number;
  currentRadioOptionSelected:string;
  totalScore:number;
  revealScore:boolean;
  maxScore:number;
  questionsJson;
  fileToLoad:string;


  constructor(public route : ActivatedRoute,private dataService: DataService){
    this.fileToLoad="";
    this.currentQuestionIndex=0;
    this.totalScore=0;
    this.revealScore=false;
    this.maxScore=0;
    this.currentRadioOptionSelected="";
    this.questionsJson=[{
      "question": "Loading...",
      "answers": [{
        "optionKey": "",
        "optionVal": "Loading..."
      }, {
        "optionKey": "",
        "optionVal": "Loading..."
      }, {
        "optionKey": "",
        "optionVal": "Loading..."
      }, {
        "optionKey": "",
        "optionVal": "Loading..."
      }],
      "correctOptionKey": "A",
      "correctAnsExplain": "London is the Capital of UK since 1654",
      "marks": 0
    }];


  }

ngOnInit(): void {
    this.route.params.subscribe(p=> {
      this.fileToLoad = p['p1']
    });
    console.log(this.fileToLoad);

    this.dataService.sendGetRequest(this.fileToLoad,"getFileData").subscribe((data) => {
      var jsonData = JSON.stringify(data);
      var jsonArr = JSON.parse(jsonData);
      this.questionsJson = jsonArr;
      console.log(this.questionsJson)
    });
}

onClickNext(index:number):void {
  var questionObject = this.questionsJson.at(index);
  var marks = questionObject?.marks;
  if(marks != undefined && this.currentRadioOptionSelected===questionObject?.correctOptionKey){
    this.totalScore = this.totalScore + marks;
  }
  this.currentQuestionIndex++;

}

onClickSubmit():void {
  this.revealScore = true;
  let total = 0;
  this.questionsJson.forEach(x => total = total+x.marks);
  this.maxScore = total;
  this.currentQuestionIndex = this.questionsJson.length;
}

onClickSkip():void {
  this.currentQuestionIndex++;
  this.currentRadioOptionSelected="";
}

onRadioClick(optionSelected:string):void {
  this.currentRadioOptionSelected=optionSelected;
}

}
