import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Columns } from '@shared/interfaces';
import { LoaderService } from '@core/services/loader-service.ts.service';
import { SkeletonTableComponent } from '../skeletons/skeleton-table/skeleton-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatPaginatorModule,
    SkeletonTableComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class TableComponent implements OnInit {
  private loaderService = inject(LoaderService);
  
  isloading: boolean = false;
  loaderType: 'loader' | 'skeleton' | null = null;
  search: string = '';

  @Input() data: any[] = [];
  @Input() columns: Columns [] = [];
  @Input() length: number = 0;
  @Input() loadingTable: boolean = true;
  @Input({required: true}) title: string = ''
  @Output() paginationChange = new EventEmitter<PageEvent>();
  @Output() optionSelected = new EventEmitter<any>();
  @Output() onSearchText = new EventEmitter<string>();

  get dataSize() {
    return this.data.length;
  }

  ngOnInit() {
    this.getLoaderType();
  }

  getLoaderType(){
    this.loaderService.loader$.subscribe((loaderType) => {
      if(loaderType){
        this.loaderType = loaderType.loaderType;
        this.isloading = true;
      }else {
        this.isloading = false;
        this.loaderType = null;
      }
    })
  }

  selectedOption(event: MatSelectionListChange) {
    const optionsSelected = event.options.filter(o => o.selected).map(o => o.value);
    const selectedOption = optionsSelected.length > 0 ? optionsSelected[0] : null;
    this.optionSelected.emit(selectedOption);
  }

  pageChange(event: PageEvent){
    this.paginationChange.emit(event)
  }

  onSearch(){
    this.onSearchText.emit(this.search)
  }

  clearSearch(){
    this.search = ''
    this.onSearchText.emit(this.search)
  }

}
