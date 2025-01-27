// import request from 'supertest';

// import fastify from 'fastify';

// const app=fastify({
//     logger:true
// });

// //import app from '../../app.js';

// import Users from '../../models/Users.js';

// jest.mock('../../models/Users.js');


// beforeAll(async () => {
//     await app.listen(3021); // Ensure the server is started on port 3020 (or any available port)
// });

// afterAll(async () => {
//     await app.close(); // Close the app after all tests are done
// });

// // testing if the user already exists
// describe("testing the registartion of user",()=>{
//     test("should respond with 400 status code",async()=>{
//         Users.findOne.mockResolvedValue({username:'testname'});

//         const response=await request(app)
//         .post('/register')
//         .send({username:'testname',password:'testpassword',email:'testemail',role:'testrole'});

//         expect(response.statusCode).toBe(400);
//        // expect(responce.body).toBe('user  already exists.Try with another username');
//         expect(response.body).toBe('Username already exists. Try with another username');


//     })

//     })



// // testing the /register for all success cases

// describe("testing the  /registering the user",()=>{

//     test("should respond with a 201 status code", async ()=>{
//         const response =await request(app).post('/register').send({
//             username:"username",
//             password:"password",
//             email:"email",
//             role:"role"
//     })

//     expect(response.statusCode).toBe(201);

//     test("should specify json in the context type header", async()=>{

//         const response=await request(app).post('/register').send({
//             username:"username",
//             password:"password",
//             email:"email",    
//             role:"role"
//         })
//         expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//     })

//     test("should return the user object",async()=>{

//         const response=(await request(app).post('/register')).send({
//             username:"username",
//             password:"password",
//             email:"email",
//             role:"role"
//         })
//         expect(response.body).toEqual({username:"username",password:"password",email:"email",role:"role"});
//     })

// })

// })


// // testing when username or password or email or role is missing

// describe("testing when username or password or email or role is missing",()=>{

//     test("should respond with a status code of 400 ",async()=>{

//         const bodydata=[
//             {username:"username",password:"password",email:"email"},
//             {username:"username",password:"password",role:"role"},
//             {username:"username",email:"email",role:"role"},
//             {password:"password",email:"email",role:"role"},
//             {username:"username",password:"password"},
//             {username:"username",email:"email"},
//             {username:"username",role:"role"},
//             {email:"email",role:"role"},
//             {password:"password",email:"email"},
//             {password:"password",role:"role"},
//             {username:"username",password:"password",email:"email",role:"role"},
//             {username:"username"},
//             {password:"password"},  
//             {email:"email"},
//             {role:"role"},
//             {},
//         ]

//         for(let i=0;i<bodydata.length;i++){

//             const response=await request(app).post('/register').send(bodydata[i]);
//             expect(response.statusCode).toBe(400);
//             expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//             expect(response.body).toEqual({error:'error creating the user'})


//         }
//     })

// })

import app from '../../app.js'; // Your Fastify app
import Users from '../../models/Users.js'; // Users model

jest.mock('../../models/Users.js'); // Mock Users model



beforeAll(async () => {
    await app.listen(3021); // Ensure the Fastify app is running on port 3021
  });
  
  afterAll(async () => {
    await app.close(); // Close the app after tests
  });

// Testing if the user already exists
describe("testing the registration of user", () => {
    test("should respond with 400 status code", async () => {
        // Mock findOne to return a user with the username 'testname'
        Users.findOne.mockResolvedValue({ username: 'testname' });

        const response = await app.inject({
            method: 'POST',
            url: '/auth/register',
            payload: { username: 'testname', password: 'testpassword', email: 'testemail', role: 'testrole' }
        });

        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.body)).toEqual({ error: 'Username already exists. Try with another username' });

        //expect(response.body).toBe('Username already exists. Try with another username');
    });
});

// Testing the /register for all success cases
describe("testing the /registering the user", () => {
    test("should respond with a 201 status code", async () => {
        Users.findOne.mockResolvedValue(null);

        const mockSave = jest.fn().mockResolvedValue({});
        Users.prototype.save = mockSave;

        const response = await app.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                username: "username",
                password: "password",
                email: "email",
                role: "role"
            }
        });

        expect(response.statusCode).toBe(201);
        expect(mockSave).toHaveBeenCalledTimes(1);
    });

    test("should specify json in the content-type header", async () => {

       Users.findOne.mockResolvedValue(null);

        const mockSave = jest.fn().mockResolvedValue({});
        Users.prototype.save = mockSave;

        const response = await app.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                username: "username",
                password: "password",
                email: "email",
                role: "role"
            }
        });

        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
        expect(mockSave).toHaveBeenCalledTimes(1);
    });

    test("should return the user object", async () => {

       Users.findOne.mockResolvedValue(null);

        const mockSave = jest.fn().mockResolvedValue({});
        Users.prototype.save = mockSave;

        const response = await app.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                username: "username",
                password: "password",
                email: "email",
                role: "role"
            }
        });

        expect(JSON.parse(response.body)).toEqual({message:'user created successfully'});
        
        expect(mockSave).toHaveBeenCalledTimes(1);
    });
});

// Testing when username or password or email or role is missing
describe("testing when username or password or email or role is missing", () => {
    test("should respond with a status code of 400", async () => {


       // Users.findOne.mockResolvedValue({ username: 'testname' });
       const mockSave = jest.fn().mockResolvedValue({});
       Users.prototype.save = mockSave;


        const bodydata = [
            { username: "username", password: "password", email: "email" },
            { username: "username", password: "password", role: "role" },
            { username: "username", email: "email", role: "role" },
            { password: "password", email: "email", role: "role" },
            { username: "username", password: "password" },
            { username: "username", email: "email" },
            { username: "username", role: "role" },
            { email: "email", role: "role" },
            { password: "password", email: "email" },
            { password: "password", role: "role" },
            { username: "username", password: "password", email: "email", role: "role" },
            { username: "username" },
            { password: "password" },
            { email: "email" },
            { role: "role" },
            {}
        ];

        for (let i = 0; i < bodydata.length; i++) {
            const response = await app.inject({
                method: 'POST',
                url: '/auth/register',
                payload: bodydata[i]
            });

            expect(response.statusCode).toBe(400);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
            expect(JSON.parse(response.body)).toEqual({ error: 'Error creating the user' });
            expect(mockSave).toHaveBeenCalledTimes(0);
        }
    });
});
