import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  comments: any[] = [];
  filteredComments: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  isLoading: boolean = false;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.dataService.getComments().subscribe(data => {
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

  handleSort({ column, direction }: { column: string, direction: string }): void {
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

  handleDelete(id: number): void {
    this.comments = this.comments.filter(comment => comment.id !== id);
    this.totalItems = this.comments.length;
    this.updatePage();
  }

  handleEdit({ id, newEmail }: { id: number, newEmail: string }): void {
    const comment = this.comments.find(comment => comment.id === id);
    if (comment) {
      comment.email = newEmail;
      this.updatePage();
    }
  }

  handlePageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  handleItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePage();
  }

  handleSearch(searchTerm: string): void {
    this.currentPage = 1;
    this.filteredComments = this.comments.filter(comment =>
      comment.name.includes(searchTerm) || 
      comment.email.includes(searchTerm) ||
      comment.body.includes(searchTerm)
    ).slice(0, this.itemsPerPage);
  }
}
