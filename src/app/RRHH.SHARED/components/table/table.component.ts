import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Columns } from '@shared/interfaces';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatListModule,
    MatPaginatorModule
  ]
})
export class TableComponent implements OnInit {
  search: string = '';

  @Input() data: any[] = [];
  @Input() columns: Columns [] = [];
  @Input() length: number = 0;
  @Output() paginationChange = new EventEmitter<PageEvent>();
  @Output() optionSelected = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  selectedOption(event: MatSelectionListChange) {
    const optionsSelected = event.options.filter(o => o.selected).map(o => o.value);
    const selectedOption = optionsSelected.length > 0 ? optionsSelected[0] : null;
    this.optionSelected.emit(selectedOption);
  }

  pageChange(event: PageEvent){
    this.paginationChange.emit(event)
  }


}
