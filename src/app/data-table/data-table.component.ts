import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() itemsPerPage: number = 10;
  @Output() onSort = new EventEmitter<{ column: string, direction: string }>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<{ id: number, newEmail: string }>();
  @Output() onSearch = new EventEmitter<string>();
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void { }

  search(): void {
    this.onSearch.emit(this.searchTerm);
  }

  sort(column: string, direction: string): void {
    this.onSort.emit({ column, direction });
  }

  delete(id: number): void {
    this.onDelete.emit(id);
  }

  edit(id: number, newEmail: string): void {
    this.onEdit.emit({ id, newEmail });
  }
}
