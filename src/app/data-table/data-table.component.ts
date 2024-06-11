import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit{
  comments: any[] = [];
  filteredComments: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();

}

fetchData(): void {
  this.isLoading = true;
  this.http.get('https://jsonplaceholder.typicode.com/comments')
    .subscribe((data: any) => {
      this.comments = data;
      this.totalItems = data.length;
      this.updatePage();
      this.isLoading = false;
    });
}

updatePage(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.filteredComments = this.comments.slice(startIndex, endIndex);
}

onSearch(): void {
  this.currentPage = 1;
  this.updatePage();
}

onPageChange(page: number): void {
  this.currentPage = page;
  this.updatePage();
}

onItemsPerPageChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const itemsPerPage = selectElement.value === 'all' ? this.totalItems : parseInt(selectElement.value, 10);
  this.itemsPerPage = itemsPerPage;
  this.currentPage = 1;
  this.updatePage();
}


sortData(column: string, direction: string): void {
  this.comments.sort((a, b) => {
    let comparison = 0;
    if (a[column] > b[column]) {
      comparison = 1;
    } else if (a[column] < b[column]) {
      comparison = -1;
    }
    return direction === 'asc' ? comparison : -comparison;
  });
  this.updatePage();
}

deleteComment(id: number): void {
  this.comments = this.comments.filter(comment => comment.id !== id);
  this.totalItems = this.comments.length;
  this.updatePage();
}

editComment(id: number, newEmail: string): void {
  const comment = this.comments.find(comment => comment.id === id);
  if (comment) {
    comment.email = newEmail;
    this.updatePage();
  }
}

get pageCount(): number[] {
  const count = Math.ceil(this.totalItems / this.itemsPerPage);
  return Array.from({ length: count }, (_, i) => i + 1);
}

}
