import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { AsignationCompanies } from 'src/app/RRHH.MODULES/rrhh-management-module/interfaces/company.interface';

@Component({
  standalone: true,
  imports: [
    MatListModule,
  ],
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent {

  @Input() data: AsignationCompanies[] = []; 
  @Output() optionSelected = new EventEmitter<AsignationCompanies>();


  selectedOption(event: MatSelectionListChange) {
    const optionsSelected = event.options.filter(o => o.selected || !o.selected).map(o => o.value);
    const selectedOption = optionsSelected.length > 0 ? optionsSelected[0] : null;
    this.optionSelected.emit(selectedOption);
  }

}
