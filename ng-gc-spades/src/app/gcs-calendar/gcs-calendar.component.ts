import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gcs-calendar',
  templateUrl: './gcs-calendar.component.html',
  styleUrls: ['./gcs-calendar.component.scss']
})
export class GcsCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.generateCalendar(new Date());
  }
  
  generateCalendar(date: Date ):void{
    let days: Array<any> = new Array();
    days[0] = [];
    let firstDay: Date = new Date(date.setDate(1));
    let generating: boolean = true;
    while(generating){
      let firstWeekDay: number = firstDay.getDay()  || 7 - 1;
      if( firstWeekDay != 1){
        let remainder = firstWeekDay;
          for(remainder;remainder > 1; remainder--){
            let dateToPush = new Date(new Date(firstDay.getTime()).setDate(firstDay.getDate() - (remainder - 1))).getDate();
            days[0].push( [dateToPush, 'previous']);
          }
      }
      let remainder = firstWeekDay;
      let dateBackup: Date;
      for(remainder; remainder < 8 ; remainder++){
        let dateToPush = new Date(new Date(firstDay.getTime()).setDate(firstDay.getDate() + (remainder - firstWeekDay))).getDate();
        if(remainder == 7){
          dateBackup = new Date(new Date(firstDay.getTime()).setDate(firstDay.getDate() + (remainder - firstWeekDay)));
        }
        days[0].push( [dateToPush, 'current']);
      }
      let canStillGenerate: boolean = true;
      let index: number = 1;
      while(canStillGenerate){
        let dayToPush = new Date(dateBackup.setDate(dateBackup.getDate() + 1)).getDate();
        if(dayToPush != 1){
          if(!days[Math.floor(index / 7) + 1]){
            days[Math.floor(index / 7) + 1] = [];
          }
          days[Math.floor(index / 7) + 1 ].push([dayToPush, 'current'])
        }else{
          canStillGenerate = false;
        }
        index++;
      }
      remainder = days.length;

      generating = false;
    }
    console.log(days);
    
  }
}
