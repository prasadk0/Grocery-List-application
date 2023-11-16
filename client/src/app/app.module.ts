import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { TodosComponent } from './todos/todos.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { MuiModule } from '@mui/material'; // Import Material-UI module
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import { FullCalendarModule } from '@fullcalendar/angular';
const routes: Routes = [
  
  { path: 'calender', component: TodosComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,FullCalendarModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    // MuiModule
    MatIconModule,
    MatBadgeModule,
    MatExpansionModule,
    // MatFormFieldModule,
    MatFormFieldModule, // Add MatFormFieldModule
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
