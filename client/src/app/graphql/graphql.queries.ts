import {gql} from 'apollo-angular'

const GET_TODOS = gql`
  query {
    lists {
      id
      name,
      quantity,
      description
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($name: String!, $description: String!,$quantity:Int!) {
    addTodo(name: $name, description: $description,quantity:$quantity) {
      id
      name
      quantity
      description
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
  `
  const CLEAR_TODO=gql`
  mutation clearTodo {
    clearTodo
  }
  `

export {GET_TODOS, ADD_TODO, DELETE_TODO,CLEAR_TODO}
