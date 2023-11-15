const express = require('express');
const cors = require('cors');
const { graphqlHTTP }= require('express-graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean
  } = require('graphql')


const Lists = [
    // { id: 1, name: 'Cook Meals',quantity:90, description: 'Need to cook meals'},
    // { id: 2, name: 'Wash Clothes',quantity:90, description: 'Need to put the clothes in WM'},
]

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'This is a todo',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      quantity: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
    })
  })


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      lists: {
        type: new GraphQLList(TodoType),
        description: 'List of All Lists',
        resolve: () => Lists
      },
      todo:{
        type: TodoType,
        description: 'Single Todo',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt)
            },
        },
        resolve: (root, args) => {
            return Lists.find(todo => todo.id === args.id)
        }
      }
    })
  })

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addTodo: {
        type: TodoType,
        description: 'Add a new Todo',
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            quantity: {
              type: new GraphQLNonNull(GraphQLInt)
          },
            description: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        resolve: (root, args) => {
            const newTodo = {
                id: Lists.length + 1,
                name: args.name,
                quantity: args.quantity,
                description: args.description,
            }
            Lists.push(newTodo)
            return newTodo
      }},
      deleteTodo: {
        type: TodoType,
        description: 'Delete a Todo',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt)
            },
        },
        resolve: (root, args) => {
            const todo = Lists.find(todo => todo.id === args.id)
            if(todo){
                Lists.splice(Lists.indexOf(todo), 1)
                return todo
            }
            return null
        }
      },
      clearTodo: {
        type: GraphQLBoolean, // Return a boolean to indicate success
        description: 'Clear all Lists',
        resolve: () => {
            Lists.length = 0; // Clear the Lists array
            return true; // Return true to indicate success
        }
    },
})})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  })

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');