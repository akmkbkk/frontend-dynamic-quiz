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
      if(this.fileJson.length === 0){
        this.errorMessage = "No Questions found yet. Please add to the Catalogue File.";
      }
      console.log(this.fileJson)
    });

  }

  fileJson;
  errorMessage;

  constructor(private _router: Router,private dataService: DataService){
    this.fileJson = [{
      testName:"Loading...",
      fileName:"Loading...",
      totalMarks:"Loading...",
      testDesc:"Loading..."
    }]

    this.errorMessage = "";
  }



}
