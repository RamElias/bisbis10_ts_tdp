import request from 'supertest';
import app from './index'; 

describe('Restaurants API', () => {
    it('should get all restaurants', async () => {
        const res = await request(app).get('/restaurants');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get restaurants by cuisine', async () => {
        const res = await request(app).get('/restaurants?cuisine=Asian');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should get a specific restaurant', async () => {
        const res = await request(app).get('/restaurants/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should add a restaurant', async () => {
        const newRestaurant = {
            name: "Taizu",
            isKosher: false,
            cuisines: ["Asian", "Mexican", "Indian"]
        };
        const res = await request(app).post('/restaurants').send(newRestaurant);
        expect(res.statusCode).toEqual(201);
    });

    it('should update a restaurant', async () => {
        const updatedData = { cuisines: ["Asian"] };
        const res = await request(app).put('/restaurants/1').send(updatedData);
        expect(res.statusCode).toEqual(200);
    });

    it('should delete a restaurant', async () => {
        const res = await request(app).delete('/restaurants/1');
        expect(res.statusCode).toEqual(204);
    });
});

describe('Ratings API', () => {
    it('should add a restaurant rating', async () => {
        const newRating = { restaurantId: 2, rating: 3.3 };
        const res = await request(app).post('/ratings').send(newRating);
        expect(res.statusCode).toEqual(200);
    });
});

describe('Order API', () => {
    it('should create an order', async () => {
        const newOrder = {
            restaurantId: 2,
            orderItems: [{ dishId: 12, amount: 1 }, { dishId: 14, amount: 1 }]
        };
        const res = await request(app).post('/order').send(newOrder);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('orderId');
    });
});

describe('Dishes API', () => {
    it('should add a dish to a restaurant', async () => {
        const newDish = { name: "Shakshuka", description: "Great one", price: 34 };
        const res = await request(app).post('/restaurants/1/dishes').send(newDish);
        expect(res.statusCode).toEqual(201);
    });

    it('should update a dish', async () => {
        const updatedDish = { description: "Updated description", price: 36 };
        const res = await request(app).put('/restaurants/1/dishes/1').send(updatedDish);
        expect(res.statusCode).toEqual(200);
    });

    it('should delete a dish', async () => {
        const res = await request(app).delete('/restaurants/1/dishes/1');
        expect(res.statusCode).toEqual(204);
    });

    it('should get dishes by a restaurant', async () => {
        const res = await request(app).get('/restaurants/1/dishes');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
