import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader }  from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import {getRestaurantById, getRestaurants, 
  getUserListings, searchRestaurants, 
  getListingsCount} from '../resolvers/queries.resolver.js'
import { addRestaurant, updateRestaurant, deleteRestaurant } from '../resolvers/mutations.resolver.js';

const resolvers = {
    Query: {
      healthCheck: ()=> "OK",
      getRestaurant: getRestaurantById,
      listingsCount: getListingsCount,
      getRestaurants: (_,args)=> ({args}),
      getUserListings,
      searchRestaurants
    },
    Mutation:{
        createRestaurant: addRestaurant,
        updateRestaurant,
        deleteRestaurant
    },
    LandingPage:{
      listings: getRestaurants,
    }
};

// Load the type definitions from .gql files using a glob pattern
const typeDefs = loadSchemaSync('./schema/*.gql', {
    loaders: [new GraphQLFileLoader()],
});
// console.log('Schema Object:', typeDefs);
  
// Combine the loaded type definitions and resolvers into an executable schema
const schema = addResolversToSchema({
  schema: typeDefs,
  resolvers,
});

export default schema;