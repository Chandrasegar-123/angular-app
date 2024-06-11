import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  get pageCount(): number[] {
    const count = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const itemsPerPage = selectElement.value === 'all' ? this.totalItems : parseInt(selectElement.value, 10);
    this.itemsPerPageChange.emit(itemsPerPage);
  }
}
