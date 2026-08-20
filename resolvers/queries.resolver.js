import queryService from '../services/queries.service.js'

const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 10;

export const searchRestaurants = async(_, args,{prisma},info)=>{
    const {query,limit, page, orderBy} = args;
    const q = query.trim();
    if(q.length < 2) return {data:[],totalCount: 0}
    const offset = page ?? 1;
    const safeLimit = limit ? Math.min(limit,MAX_LIMIT) : DEFAULT_LIMIT;
    const where = queryService.buildSearchWhereClause(q);
    let prismaOrderBy =queryService.buildOrderByClause(orderBy)
    
    const [data,totalCount] = await prisma.$transaction([
        prisma.listings.findMany({
            where,
            take: safeLimit,
            skip: (offset-1) * safeLimit,
            orderBy: prismaOrderBy
        }),
        prisma.listings.count({where})
    ]);
    // console.log(result);
    return {data,totalCount};
}

// Landing page and My-Listings page queries. getAll and getListings queries
export const getRestaurants = async (parent,_,{prisma},info) => {
    const limit = parent.args.limit;
    const page = parent.args.page;
    const ratings = parent.args.ratings;
    console.info("Parent ARGS:", limit, page, ratings)
    let {select,result} = queryService.prepareSelect(info);
    console.log("SELECT", select);

    if(ratings) select = queryService.ratingsJoinSelect(select);

    const offset = page ?? 1;
    const safeLimit = limit>0 ? Math.min(limit,MAX_LIMIT) : DEFAULT_LIMIT;
    console.log(offset,safeLimit);
    result.data = await prisma.listings.findMany({
        relationLoadStrategy: 'join', //2. Forces a native PostgreSQL JOIN
        select: select,
        take: safeLimit,
        skip: (offset-1) * safeLimit,
    });
    console.info(result.data);
    return result.data;
}

export const getListingsCount = async (_,{filter},{prisma},__)=> {
    const where = filter ? {created_by: filter} : {};
    const count = await prisma.listings.count({where});
    console.log("Count",count)
    return count;
}

export const getUserListings = async (_,{created_by,limit,page},{prisma},info) => {
    const {select,result} = queryService.prepareSelect(info);
    console.info("Selection", select);
    const offset = page ?? 1;
    const safeLimit = limit>0 ? Math.min(limit,MAX_LIMIT) : DEFAULT_LIMIT; //for frontend, range is 4 - 8 in increments of 2
    result.data = await prisma.listings.findMany({
        select: select,
        where: {created_by},
        take: safeLimit,
        skip: (offset-1) * safeLimit
    });
    console.info(result.data);
    return result.data;
}

// Restaurant Details page query for Edit page and single view page. getOne, getListing and getPartial
export const getRestaurantById = async (_,{id},{prisma},info) => {
    const {select,result} = queryService.prepareSelect(info);
    console.log(select)
    result.data = await prisma.listings.findUnique({
        where: {public_id: id},
        select
    });
    console.log(result)
    return result.data;
}