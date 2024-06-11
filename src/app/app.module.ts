import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
