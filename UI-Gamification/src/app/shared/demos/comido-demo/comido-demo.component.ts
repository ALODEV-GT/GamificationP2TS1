import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comido-demo',
  templateUrl: './comido-demo.component.html',
  styleUrls: ['./comido-demo.component.css']
})
export class ComidoDemoComponent implements OnInit {

  constructor() { }

  esDemo = true;

  ngOnInit(): void {
  }

}
