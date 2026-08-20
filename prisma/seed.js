import {PrismaClient} from './generated/index.js';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

const uuid = randomUUID();

const prisma = new PrismaClient();

faker.seed(140);

async function main(){
    const SEED_COUNT = 2000;

    console.info(`Seeding ${SEED_COUNT} restaurants...`);

    await prisma.listings.deleteMany();

    const cities = [
        'Cape Town',
        'New York',
        'Johannersburg',
        'San Francisco',
        'Durban'
    ];

    const keywords = ['Pizza','Burger','Sushi','Taco','Pasta','Bakery'];
    const restaurants = Array.from({length: SEED_COUNT}).map(() => {
        const hasKeyword = Math.random() < 0.4;
        const priceRange = faker.number.int({min:1,max:5});
        const name = hasKeyword ? 
            `${faker.helpers.arrayElement(keywords)} ${faker.company.name()}` 
            : faker.company.name();
        const foodDescription = `${faker.food.adjective()} ${faker.food.ethnicCategory()} food. ${faker.food.description()}`;
        const countryCode = faker.location.countryCode();
        
        return {
            name,
            description: foodDescription,
            city: faker.helpers.arrayElement(cities),
            price_range: priceRange,
            str_sub: faker.location.streetAddress(),
            country: countryCode,
            // rating: faker.datatype.number({min:1, max:5}),
            // keyword: faker.helpers.arrayElement(keywords),
            created_by: uuid
        }
    });
    await prisma.listings.createMany({
        data: restaurants
    });
}

await main().catch(e=>{
    console.error(e);
    process.exit(1);
}).finally(async()=>{
    console.log("Cleaning up!")
    await prisma.$disconnect();
})