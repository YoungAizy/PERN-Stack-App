import {PrismaClient} from '../prisma/generated/index.js';
// import graphqlFields from 'graphql-fields';
// import {internalColumns} from '../utils/mapKeys';

const prisma = new PrismaClient();

// Mutation to create a new restaurant
const createRestaurant = async (listing) => {
    return await prisma.listings.create({
        data: listing
    });
}

// Mutation to update restaurant based on passed fields and values
const updateRestaurant = async(id,user_id,data)=>{
    return await prisma.listings.update({
        where: {
            public_id: id,
            created_by: user_id
        },
        data
    });
}

const deleteRestaurant = async(id,user_id) => {
    return await prisma.listings.delete({
        where: {
            public_id: id,
            created_by: user_id
        }
    });
}

export default {createRestaurant, updateRestaurant, deleteRestaurant}