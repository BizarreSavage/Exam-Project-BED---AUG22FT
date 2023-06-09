const request = require('supertest');
const app = require('../app.js');
const dotenv = require('dotenv');

dotenv.config();

let authToken;
let categoryId;
let server;
let itemTestId;
let userIdForDeleting;

beforeAll(async () => {
  server = app.listen(process.env.PORT);
});

describe('POST /setup', () => {

  it('should populate the database', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));  // Waiting a bit for the database to finish setup
    const res = await request(app).post('/setup');
    expect(res.statusCode).toEqual(200);
  }); 
})


   // Test signup endpoint
  describe('POST /signup', () => {
    it('Should register a new user', async () => {
      const res = await request(app).post('/signup').send({
        firstname: 'John',
        lastname: 'Smith',
        username: 'testuser1',
        password: 'password1',
        email: 'testuser1@example.com',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.user.username).toEqual('testuser1');
      userIdForDeleting = res.body.user.id
    });
  }); 


  // Login and save JWT token
  describe('POST /login', () => {
    it('should login a user and return a JWT token', async () => {
      const res = await request(app).post('/login').send({
        username: 'testuser1',
        password: 'password1',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
      authToken = `Bearer ${res.body.token}`; 
    });
  });

   // Login and save JWT token for admin
  let adminAuthToken;
  describe('POST /login', () => {
    it('should login an admin user and return a JWT token', async () => {
      const res = await request(app).post('/login').send({
        username: 'Admin',
        password: 'P@ssword2023',
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.token).toBeDefined();
      adminAuthToken = `Bearer ${res.body.token}`; 
    });
  });

  // Create a new category
  describe('POST /category', () => {
    it('creates a new category with the name CAT_TEST', async () => {
      const res = await request(app)
        .post('/category')
        .set('Authorization', adminAuthToken)
        .send({ name: 'CAT_TEST' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('CAT_TEST');
      categoryId = res.body.id;
    });
  });

  describe('POST /item', () => {
    it('creates a new item with the CAT_TEST category and the ITEM_TEST item name', async () => {
      const res = await request(app)
        .post('/item')
        .set('Authorization', adminAuthToken)
        .send({
          name: 'ITEM_TEST',
          sku: 'apiTest',
          price: 23,
          img_url: 'http://we-are-testing.com/',
          stock: 1337,
          categoryId: categoryId,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('ITEM_TEST');
      expect(res.body.categoryId).toEqual(categoryId);
      itemTestId = res.body.id;
    });
  });

  describe('POST /search', () => {
    it('search for items with the text "mart" in the item name', async () => {
      const res = await request(app)
        .post('/search')
        .set('Authorization', authToken)
        .send({ item_name: 'mart' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.items.length).toBe(3);
    });

    it('search for all items with the name "Laptop"', async () => {
      const res = await request(app)
        .post('/search')
        .set('Authorization', authToken)
        .send({ item_name: 'Laptop' });

      expect(res.statusCode).toEqual(200);
      expect(res.body.items.length).toBe(1);
    });
  });

  describe('Test Admin Endpoints', () => {
    it('checks if Admin can access the /allcarts endpoint', async () => {
      const res = await request(app)
        .get('/allcarts')
        .set('Authorization', adminAuthToken);

      expect(res.statusCode).toEqual(200);
    });

    it('checks if Admin can access the /allorders endpoint', async () => {
      const res = await request(app)
        .get('/allorders')
        .set('Authorization', adminAuthToken);

      expect(res.statusCode).toEqual(200);
    });

    it('checks if Admin can edit the /item endpoint', async () => {
      const res = await request(app)
        .put(`/item/${itemTestId}`)
        .set('Authorization', adminAuthToken)
        .send({
          name: 'ITEM_TESTed2',
          sku: 'apiTest',
          price: 1337,
          img_url: 'http://we-are-testingAGAIN.com/',
          stock: 1337,
          categoryId: categoryId,
        });

      expect(res.statusCode).toEqual(200);
    });
  }); 

  describe('Delete all the values from the last tests', () => {
    
    it('checks if Admin can delete the added item', async () => {
      const res = await request(app).delete(`/item/${itemTestId}`)
      .set('Authorization', adminAuthToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Item deleted');
    });

    it('checks if Admin can delete the added category', async () => {
      const res = await request(app).delete(`/category/${categoryId}`)
      .set('Authorization', adminAuthToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Category deleted');
    });

    it('checks if Admin can delete the added user', async () => {
      const res = await request(app).delete(`/users/${userIdForDeleting}`)
      .set('Authorization', adminAuthToken);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('User deleted');
  });
});
  
  describe('POST /setup again', () => {
    it('should not make the API call or populate the database', async () => {
      const res = await request(app).post('/setup');
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('Database already populated.');
    });
  });

afterAll((done) => {
    server.close(done);
  });

  