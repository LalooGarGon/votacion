import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  level: any;

  constructor(private router: Router) {
    this.level = localStorage.getItem('level');
  }

  ngOnInit(): void {}

  salir() {
    console.log('saliendo');

    localStorage.removeItem('level');

    localStorage.removeItem('estado');

    localStorage.removeItem('yaVoto');

    localStorage.setItem('logueado', '0');
    this.router.navigate(['/', 'login']);
  }
}
