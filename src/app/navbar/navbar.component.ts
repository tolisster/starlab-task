import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: '[app-navbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {class: 'navbar navbar-expand-lg navbar-dark'}
})
export class NavbarComponent implements OnInit {
  languages = ['en', 'ro', 'ru'];

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit() {
  }

}
