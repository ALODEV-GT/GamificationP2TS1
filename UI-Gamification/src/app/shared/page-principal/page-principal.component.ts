import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-principal',
  templateUrl: './page-principal.component.html',
  styleUrls: ['./page-principal.component.css']
})
export class PagePrincipalComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  goCreateJuegoMemorama(){
    this.router.navigate(['profesor/creat-game-memorama'])
  }

}
