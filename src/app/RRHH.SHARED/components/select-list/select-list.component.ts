import { Component, Input, OnInit } from '@angular/core';
import { Catalogs } from '@shared/interfaces/catalogs.interface';

@Component({
  standalone: true,
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {

  @Input() data: Catalogs[] = []
  ngOnInit() {
  }

}
