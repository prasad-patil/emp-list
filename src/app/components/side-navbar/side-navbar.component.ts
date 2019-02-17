import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
  isCollapsed: false;

  homeCollapse = true;
  constructor() {}

  ngOnInit() {}
}
