import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatIconRegistry
} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = true;
  today: number = Date.now();
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'verified_user',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-verified_user-24px.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'arrow_drop_down',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/svgs/baseline-arrow_drop_down-24px.svg'
      )
    );
  }
}
