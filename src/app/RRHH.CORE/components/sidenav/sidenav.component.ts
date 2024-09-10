import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavOptions } from './interfaces/sidenav.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
})
export class SidenavComponent implements OnInit {
  mobileQuery!: MediaQueryList;
  navOptions: NavOptions[] = [];
  private _mobileQueryListener: () => void;
  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.navOptions = [
      {
        id: "",
        name: "Gestion",
        route: "",
        icon: "",
        submenus: [
          {
            id: "1-1",
            name: "Paises",
            route: "./management/countries",
            icon: "public"
          },
          {
            id: "1-2",
            name: "Departamentos",
            route: "./management/departments",
            icon: "travel_explore"
          },
          {
            id: "1-3",
            name: "Municipalidades",
            route: "./management/municipalities",
            icon: "flag"
          },
          {
            id: "1-4",
            name: "Companias",
            route: "./management/companies",
            icon: "apartment"
          },
          {
            id: "1-5",
            name: "Empleados",
            route: "./management/employes",
            icon: "badge"
          }
        ]
      }
    ]

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
