'use strict';
const supertest = require("supertest");
const should = require("should");

const server = supertest.agent("http://localhost:3000");
const config = require('../config/tests');


describe("For not logged users ",() =>{

    it("Just a simple home request ",(done) => {
        server
            .get("/")
            .end(function(err,res){

                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for getting single car info ",(done) => {
        server
            .get("/cars/" + config.CAR)
            .end(function(err,res){
                res.body.should.have.property('_id');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('stockId');
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for getting FAKE car info ",(done) => {
        server
            .get("/cars/" + config.FAKE_CAR)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

    //for every new run of  this test need to change email

    //it("Request for  singing up",(done) => {
    //
    //    let body = {
    //        name : 'FAKE' ,
    //        surName : 'FAKE',
    //        email : 'fake112@fake.ru',
    //        password : 'password',
    //        dateOfBirth : 10-10-1990
    //    };
    //    server
    //        .post("/auth/sign")
    //        .send(body)
    //        .end(function(err,res){
    //            res.body.should.have.property('_id');
    //            res.body.should.have.property('createdAt');
    //            res.body.should.have.property('email');
    //            res.body.should.be.instanceOf(Object);
    //            res.status.should.equal(200);
    //            done();
    //        });
    //});


    it("Request for  singing up with the same email!",(done) => {
        let body = {
            name : 'FAKE' ,
            surName : 'FAKE',
            email : 'fake@fake.ru',
            password : 'password',
            dateOfBirth : 10-10-1990
        };
        server
            .post("/auth/sign")
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });


    it("Request for  singing up with the BAD EMAIL!",(done) => {
        let body = {
            name : 'FAKE' ,
            surName : 'FAKE',
            email : 'fakefake.ru',
            password : 'password',
            dateOfBirth : 10-10-1990
        };
        server
            .post("/auth/sign")
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });


    it("Request for  LOGIN IN",(done) => {
        let body = {
            email : 'test3@mail.ru',
            password : 'password'
        };
        server
            .post("/auth/login")
            .send(body)
            .end(function(err,res){
                res.body.should.be.type('string');
                res.body.should.be.not.empty();
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for  LOGIN with fake data ",(done) => {
        let body = {
            email : 'xxxxx@mail.ru',
            password : 'password'
        };
        server
            .post("/auth/login")
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

});


describe("For logged users with SIMPLE rules ",() =>{

    it("Request for  ADD item into basket",(done) => {
        let body = {
            stockId : '123456'
        };
        server
            .post("/cart")
            .set({ 'x-access-token' : config.TOKEN})
            .send(body)
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.be.not.empty();
                res.status.should.equal(200);
                done();
            });
    });


    it("Request for  ADD item into basket WITHOUT stockId",(done) => {
        server
            .post("/cart")
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'UserId,StockId required' });
                res.status.should.equal(404);
                done();
            });
    });

    it("Request for  DELETE item from the basket",(done) => {
        server
            .delete("/cart/" + config.ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .send({stockId : 1010})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for  DELETE item fake Order Id",(done) => {
        server
            .delete("/cart/" + config.FAKE_ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .send({stockId : 1010})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                res.body.should.eql({ message: 'Not Found' });
                done();
            });
    });


    it("Request for  Update item amount in the  the basket",(done) => {
        server
            .put("/cart/" + config.ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .send({stockId : 1010 , amount : 10})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });


    it("Request for  Update item in the  the basket without amount",(done) => {
        server
            .put("/cart/" + config.ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .send({stockId : 1010 })
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });


    it("Request for view user own order",(done) => {
        server
            .get("/cart/view/" + config.ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('userId');
                res.body.should.have.property('status');
                res.body.should.have.property('items');
                res.status.should.equal(200);
                done();
            });
    });


    it("Request for view user own order with fake ORDER_ID",(done) => {
        server
            .get("/cart/view/" + config.FAKE_ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                res.body.should.be.not.empty();
                res.body.should.eql({ message: 'Not Found' });
                done();
            });
    });


    it("Request to confirming user order",(done) => {
        server
            .post("/cart/confirm/" + config.ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.length(24);
                res.status.should.equal(200);
                done();
            });
    });


    it("Request to confirming user order with FAKE ORDER_ID",(done) => {
        server
            .get("/cart/confirm/" + config.FAKE_ORDER_ID)
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

    //for every new run of  this test need to change stockId

    //it("Request to ADD new car into DB. User become advanced",(done) => {
    //    let body = {
    //        stockId : '202021',
    //        color : 'White',
    //        model : 'Tesla',
    //        made : 'Tesla'
    //    };
    //    server
    //        .post("/cars/")
    //        .send(body)
    //        .set({ 'x-access-token' : config.TOKEN})
    //        .end(function(err,res){
    //            res.body.should.be.instanceOf(Object);
    //            res.body.should.have.property('stockId');
    //            res.body.should.have.property('bought');
    //            res.body.should.have.property('amount');
    //            res.status.should.equal(200);
    //            done();
    //        });
    //});


    it("Request to ADD new car into DB without stockId",(done) => {
        let body = {
            color : 'White',
            model : 'Tesla',
            made : 'Tesla'
        };
        server
            .post("/cars/")
            .send(body)
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

});



describe("For logged users with ADVANCED rules ",() =>{

    it("Deleting user own car from DB",(done) => {
        server
            .delete("/advanced/cars/")
            .send({ stockId: '202020'})
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('answer');
                res.status.should.equal(200);
                done();
            });
    });


    it("Here i gonna try delete a car, which is not user own",(done) => {

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImNyZWF0ZWRBdCI6ImluaXQiLCJydWxlcyI6ImluaXQiLCJzZW5kT3JkZXJzIjoiaW5pdCIsIm93bkNhcnMiOiJpbml0IiwiX192IjoiaW5pdCIsImRhdGVPZkJpcnRoIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInN1ck5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwicnVsZXMiOnRydWUsInNlbmRPcmRlcnMiOnRydWUsIm93bkNhcnMiOnRydWUsImRhdGVPZkJpcnRoIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInN1ck5hbWUiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJjcmVhdGVkQXQiOiIyMDE2LTA1LTExVDEyOjI0OjM0LjI4MVoiLCJydWxlcyI6IlNpbXBsZSIsInNlbmRPcmRlcnMiOjAsIm93bkNhcnMiOltdLCJfX3YiOjAsImRhdGVPZkJpcnRoIjoiMTk2OS0xMi0zMVQyMzo1OTo1OC4wMTBaIiwicGFzc3dvcmQiOiIkMmEkMTAkVHdoMHJsWG1ad1V0OFlZYnYxbEpGTzdMbi81ekhYWGJLTDRyVzdvSXg5bTh0Qm5LQVZUc0siLCJlbWFpbCI6ImZha2UxMTJAZmFrZS5ydSIsInN1ck5hbWUiOiJGQUtFIiwibmFtZSI6IkZBS0UiLCJfaWQiOiI1NzMzMmE5Mjg2MjQzZTY0NzAyMTY3MGEifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NjMwMzkxNzl9.WUrxUwSSJcwz9lIPmGZrz1U-hjHTGH-voU0muMkyf4s';

        server
            .delete("/advanced/cars/")
            .send({ stockId: '202023'})
            .set({ 'x-access-token' : token})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(403);
                done();
            });
    });

    it("Updating user own car from DB",(done) => {
        server
            .put("/advanced/cars/")
            .send({ stockId: '202023', color : 'GreatColor'})
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('_id');
                res.body.should.have.property('stockId');
                res.status.should.equal(200);
                done();
            });
    });

    it("Here i gonna try Update a car, which is not user own",(done) => {

        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImNyZWF0ZWRBdCI6ImluaXQiLCJydWxlcyI6ImluaXQiLCJzZW5kT3JkZXJzIjoiaW5pdCIsIm93bkNhcnMiOiJpbml0IiwiX192IjoiaW5pdCIsImRhdGVPZkJpcnRoIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInN1ck5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwicnVsZXMiOnRydWUsInNlbmRPcmRlcnMiOnRydWUsIm93bkNhcnMiOnRydWUsImRhdGVPZkJpcnRoIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInN1ck5hbWUiOnRydWUsIm5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJjcmVhdGVkQXQiOiIyMDE2LTA1LTExVDEyOjI0OjM0LjI4MVoiLCJydWxlcyI6IlNpbXBsZSIsInNlbmRPcmRlcnMiOjAsIm93bkNhcnMiOltdLCJfX3YiOjAsImRhdGVPZkJpcnRoIjoiMTk2OS0xMi0zMVQyMzo1OTo1OC4wMTBaIiwicGFzc3dvcmQiOiIkMmEkMTAkVHdoMHJsWG1ad1V0OFlZYnYxbEpGTzdMbi81ekhYWGJLTDRyVzdvSXg5bTh0Qm5LQVZUc0siLCJlbWFpbCI6ImZha2UxMTJAZmFrZS5ydSIsInN1ck5hbWUiOiJGQUtFIiwibmFtZSI6IkZBS0UiLCJfaWQiOiI1NzMzMmE5Mjg2MjQzZTY0NzAyMTY3MGEifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NjMwMzkxNzl9.WUrxUwSSJcwz9lIPmGZrz1U-hjHTGH-voU0muMkyf4s';

        server
            .put("/advanced/cars/")
            .send({ stockId: '202023' , model : 'NewModel'})
            .set({ 'x-access-token' : token})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(403);
                done();
            });
    });


    it("Get list of all users cars",(done) => {
        server
            .get("/advanced/cars/")
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get list of all users cars without token",(done) => {
        server
            .get("/advanced/cars/")
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Token not found' });
                res.status.should.equal(404);
                done();
            });
    });

    it("Get list of a single  user car",(done) => {
        server
            .get("/advanced/cars/" + config.CAR )
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Get list of a single  user car, which is not been in the usersOwn list",(done) => {
        server
            .get("/advanced/cars/" + config.FAKE_CAR )
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'This car is not your' });
                res.status.should.equal(404);
                done();
            });
    });

});


describe("For logged users with ADMIN rules ",() =>{

    it("Get list all users",(done) => {
        server
            .get("/admin/users")
            .set({ 'x-access-token' : config.ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array);
                res.status.should.equal(200);
                done();
            });
    });

    it("Get list all users with the simple user token ",(done) => {
        server
            .get("/admin/users")
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });


    it("Get info of a single user ",(done) => {
        server
            .get("/admin/users/" + config.USER_ID)
            .set({ 'x-access-token' : config.ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.property('name');
                res.body.should.have.property('surName');
                res.body.should.have.property('email');
                res.body.should.have.property('ownCars');
                res.body.should.have.property('rules');
                res.status.should.equal(200);
                done();
            });
    });


    it("Get info of a single user with fake user Id ",(done) => {
        server
            .get("/admin/users/" + config.FAKE_USER_ID)
            .set({ 'x-access-token' : config.ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'User not found' });
                res.status.should.equal(404);
                done();
            });
    });


    it("Get list of top 5 sold cars",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : config.ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array).and.have.length(5);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get list of top 5 sold cars with the simple user token ",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });


    it("Get list of top 5 users",(done) => {
        server
            .get("/admin/topUsers")
            .set({ 'x-access-token' : config.ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array).and.have.length(5);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get list of top 5 users with the simple user token ",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });


    it("Get info about all last week orders",(done) => {
        server
            .get("/admin/lastOrders")
            .set({ 'x-access-token' : config.ADMIN_TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Array).and.have.length(7);
                res.status.should.equal(200);
                done();
            });
    });


    it("Get info about all last week orders with the simple user token ",(done) => {
        server
            .get("/admin/topCars")
            .set({ 'x-access-token' : config.TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'Permission denied' });
                res.status.should.equal(403);
                done();
            });
    });

});