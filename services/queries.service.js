import {internalColumns} from '../utils/mapKeys.js';
import graphqlFields from 'graphql-fields';

const prepareSelect = (info)=>{
    const requestedFields = Object.keys(graphqlFields(info));
    console.log(requestedFields)
    const result = {}, select = {};
    verifyFields(requestedFields,select, result);
    return {result, select}
}

const buildSearchWhereClause = (query)=>{
    return {
        OR:[
            {name: {contains:query, mode:'insensitive'}},
            {city: {contains:query, mode:'insensitive'}}
        ]
    }
}

const fieldMap = {
    NAME: 'name',
    PRICE: 'price_range'
}

const buildOrderByClause = (orderBy)=>{
    if(orderBy){
        return {
            [fieldMap[orderBy.field]]: orderBy.direction.toLowerCase()
        };
    }else{
        return {name: 'asc'}
    }
}

const verifyFields = (fields,select,result)=>{
    const invalid =[];
    fields.forEach(field=>{
        if(internalColumns[field]) {
            select[field] = true
        }else{
            invalid.push(field);
            result.invalid = invalid;
        }
    });
}

const ratingsJoinSelect = (select)=>{
    console.log("Service",select)
    select.ratings = {
        select:{
            food_sum: true,
            service_sum: true,
            location_sum: true,
            rating_count: true
        }
    }
    console.log("Ratings",select)
    return select;
}

export default {
    prepareSelect,
    ratingsJoinSelect,
    buildSearchWhereClause, 
    buildOrderByClause, 
    verifyFields
}