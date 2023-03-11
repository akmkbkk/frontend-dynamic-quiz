import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private _router: Router){

  }

  fileJson = [{
    testName:"Countries And their Capitals",
    fileName:"Countries_And_their_Capitals",
    totalMarks:"50",
    testDesc:"Countries and their capital questions"
  },{
    testName:"States and their Capitals",
    fileName:"States_and_their_Capitals",
    totalMarks:"50",
    testDesc:"States and their Capitals questions"
  }]

}
