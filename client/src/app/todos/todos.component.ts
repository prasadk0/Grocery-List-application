import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from '../graphql/graphql.queries';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
// import {  EventInput } from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
  event:EventInput[] =[
//     {title:'',date:'2023-11-16',color:''}
     


// , 
// {title: 'kjhgf', date: '2023-10-10', color: ''}
  ]
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events:this.event,
    
  };

  // onDateClick(info: any='0'): void {
  //   console.log("sdfghjkl")
  //   const title = prompt('Enter event title:');
  //   if (title) {
  //     const event = {
  //       title,
  //       date:'2023-10-10',
  //       color:'#0000FF',
       
        
  //     };
  //     // this.calendarService.addEvent(event);
  //     this.event.push(event);
  //     var  a=this.event;
  //     this.event =a;
  //     console.log(this.event)
  //   // events = this.calendarService.getCalendarOptions();
  //   }
  // }
  onDateClick(info: any = '0'): void {
    console.log("sdfghjkl");
    const title = prompt('Enter event title:');
      const date = String(prompt('Enter event date:'));
    if (title) {
      const newEvent: EventInput = {
        title,
      
        color: '#0000FF',
        date
      };
      this.event.push(newEvent);
    
      this.calendarOptions.events=[newEvent];
      console.log(this.event,date);
    }
  }
  



  
  todos: any[] = [];
  error: any;

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  addTodo() {
    // apollo graphql query to add todo
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({data}: any) => {
      this.todos = data.addTodo;
      this.todoForm.reset();
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
    }
    , (error) => {
      this.error = error;
    }
    );
  }

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_TODOS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.todos;
      this.error = error;
  }
  );
  }
}
