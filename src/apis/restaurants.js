import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHGQL_API
});
const authLink = setContext((_, { headers }) => {
console.log("Header in AppSync ", headers);
return {
    headers: {
    ...headers,
    'x-api-key': process.env.REACT_APP_GRAPHGQL_API_KEY
    }
};
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

//PUBLIC ROUTES
export const _public = {
    async all() {
        const result = await client.query({
        query: gql`
            query LandingQuery {
                getRestaurants {
                    featured(query_type: "featured") {
                        id
                        avg_rating
                        str_sub
                        city
                        name
                        img_url
                        price_range
                        total_reviews
                    }
                    best_rated(query_type: "best_rated"){
                        id
                        avg_rating
                        str_sub
                        city
                        name
                        img_url
                        price_range
                        total_reviews
                    }
                }
            }
        `,});
        // const result = await databinder.get('/public/all?req_src=client');
        return result;
    },
    async singleAll(id){ 
        const result = await client.query({
            query: gql`
                query SingleQuery {
                    getRestaurant(id: ${id}, partial: false) {
                        name
                        str_sub
                        city
                        img_url
                        avg_rating
                        description
                        price_range
                        email_addr
                        telephone
                        tel_ext
                        web_addr
                        reviews(id: ${id}) {
                            rating
                            review_text
                            reviewer_username
                        }
                    }
                }
            `,});
        // const result = await databinder.get(`/public/${id}?details=all`);
        return result;
    },
    async singlePartial(id){
        const result = await client.query({
            query: gql`
                query PartialQuery {
                    getRestaurant(id: ${id}, partial: true) {
                        description
                        telephone
                        tel_ext
                        web_addr
                        reviews(id: ${id}) {
                            rating
                            review_text
                            reviewer_username
                        }
                    }
                }
            `,});
        // const result = await databinder.get(`/public/${id}?details=partial`);
        return result;
    }
}

//PROTECTED ROUTES
export const _protected = {
    async post(payload) {
        console.log("data",payload)
        const result = await client.mutate({
            mutation: gql`
                mutation postNewListing($data: RestaurantInput!) {
                    createRestaurant(input: $data){
                        name
                        id
                        email_addr
                        description
                        city
                        price_range
                        str_sub
                        tel_ext
                        telephone
                        web_addr
                    }
                }
            `,
            variables: {
                data: payload
            }
        });
        return result;
    },
    async fetchListings(user){
        console.log("user passed:", user)
        const listings = await client.query({
            query: gql`
                query ListingsQuery {
                    getUserListings(created_by: ${user}) {
                        description
                        email_addr
                        avg_rating
                        name
                        img_id
                        img_url
                        id
                        price_range
                        str_sub
                    }
                }
            `,});
        return listings;
    },
    async fetchListing(id){
        const listing = await client.query({
            query: gql`
                query ListingsQuery {
                    getListing(id: ${id}) {
                        description
                        email_addr
                        img_url
                        img_id
                        name
                        price_range
                        str_sub
                        tel_ext
                        telephone
                        web_addr
                        city
                    }
                }
            `,});
        return listing;
    },
    async update(id,payload){
        const result = await client.mutate({
            mutation: gql`
                mutation updateListing($input: updateRestaurantInput) {
                    updateRestaurant(id: ${id}, updateInput: $input){
                        ${
                            Object.keys(payload).map(x=>(x+"\n"))
                        }
                    }
                }
            `,
            variables: {
                input: payload
            }
        });
        return result;
    },
    async updateImg(id,imgId,payload){
        console.log(id,"img-",imgId, "file:", payload);
        const result = await client.mutate({
            mutation: gql`
                mutation updateImg {
                    updateImage(id: ${id} ,img_id: ${imgId} , file: ${JSON.stringify(payload)}){
                        img_url
                    }
                }
            `,});
        return result;
    },
    async delete(id){
        const result = await client.mutate({
            mutation: gql`
                mutation deleteListing {
                    deleteRestaurant(id: ${id})
                }
            `,});
        return result;
    }
}