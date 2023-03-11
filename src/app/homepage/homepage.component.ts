import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  ngOnInit(): void {

    this.dataService.sendIndexRequest("getIndex").subscribe((data) => {
      var jsonData = JSON.stringify(data);
      var jsonArr = JSON.parse(jsonData);
      this.fileJson = jsonArr;
      console.log(this.fileJson)
    });

  }

  fileJson;

  constructor(private _router: Router,private dataService: DataService){
    this.fileJson = [{
      testName:"Loading...",
      fileName:"Loading...",
      totalMarks:"Loading...",
      testDesc:"Loading..."
    }]
  }



}
