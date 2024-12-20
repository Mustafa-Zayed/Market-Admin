import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input()
  label:string = '';

  @Input()
  iterator:any[] = [];
  
  @Input()
  all:boolean = true;
  
  @Input()
  selectedOption:any; // to set the selected value

  @Output()
  selectionChanged:EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  // selectChange(value:string){
  detectChanges(event:any){
    this.selectionChanged.emit(event);
  }
}
