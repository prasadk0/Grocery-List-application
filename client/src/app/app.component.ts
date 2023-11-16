// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Clipboard } from '@angular/cdk/clipboard';
import { ADD_TODO,CLEAR_TODO,DELETE_TODO,GET_TODOS } from './graphql/graphql.queries';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  // panelOpenState = false;
  downloadUrl:string='';
  title = 'angular-graphql';
  todos: any[] = [];
  error: any;
  count:number=0;
  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required)
  });
  copyToClipboard(){
    const jsonString = JSON.stringify(this.todos, null, 2);
   
    const formattedString = this.todos
  .map((todo:any) => `${todo.id} .  ${todo.name} ${todo.quantity} . ${todo.description}`)
  .join('\n'); // You can use a different separator, e.g., ' ', if needed
  this.clipboard.copy(formattedString);
// console.log(formattedString);
// const blob = new Blob([formattedString], { type: "application/text" });
// const url = URL.createObjectURL(blob);
// this.downloadUrl = url;
  }
  saveJSONToFile(data: object, filename: string): void {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  // constructor() {}

  // toggleTheme(): void {

  //   this.themeService.toggleTheme();
  //   console.log(   this.themeService.toggleTheme())
  // }
  // constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme(true); // Pass true for dark mode, false for light mode
  }
  downloadJSON(): void {
    const data = {
      
      obj:this.todos
    }
    const filename = 'dataset.json';
    this.saveJSONToFile(data, filename);
  }
  
  addTodo() {
    // apollo graphql query to add todo
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
        quantity: this.todoForm.value.quantity,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.addTodo;
      this.todoForm.reset();
      this.count +=1;
    }
    , (error) => {
      this.error = error;
    }
    );
   
  }
  deleteTodo(id: string) {
    // apollo graphql query to delete todo
    this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.deleteTodo;
      this.count -=1;
    }
    , (error) => {
      this.error = error;
    }
    );
  }

  clearTodo() {
    // apollo graphql query to delete todo
    this.apollo.mutate({
      mutation: CLEAR_TODO,
      
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
     
      this.count =0;
    }
    , (error) => {
      this.error = error;
    }
    );
  }
  constructor(private apollo: Apollo,private clipboard: Clipboard,private themeService: ThemeService) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_TODOS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.lists;
      this.error = error;
      this.count=this.todos.length;
      // console.log(this.todos.length)
  }
  );
  }
  clear(){
    this.todos = [];
  }
}
