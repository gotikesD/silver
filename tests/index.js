'use strict';
const supertest = require("supertest");
const should = require("should");

const server = supertest.agent("http://localhost:3000");


const CAR = '5733109a22259b5e5dd1893e';
const FAKE_CAR = '5733109a22244b5e88d1893e';
const ORDER_ID = '573200d6f16569125475c10e';
const FAKE_ORDER_ID = '443200d6f16569125475c10e';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImNyZWF0ZWRBdCI6ImluaXQiLCJydWxlcyI6ImluaXQiLCJzZW5kT3JkZXJzIjoiaW5pdCIsIm93bkNhcnMiOiJpbml0IiwiX192IjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInN1ck5hbWUiOiJpbml0IiwibmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwicnVsZXMiOnRydWUsInNlbmRPcmRlcnMiOnRydWUsIm93bkNhcnMiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwic3VyTmFtZSI6dHJ1ZSwibmFtZSI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImNyZWF0ZWRBdCI6IjIwMTYtMDUtMTBUMDc6NTg6MjAuMDc5WiIsInJ1bGVzIjoiQWR2YW5jZWQiLCJzZW5kT3JkZXJzIjoyLCJvd25DYXJzIjpbIjEyMzIxMyIsIjEyMzQ1NiIsIjEyMzQ1NjciLCIxMjM0NTY3Il0sIl9fdiI6MCwicGFzc3dvcmQiOiIkMmEkMTAkTDdraEdnL3Y5UXBzMnNwT0t4dFRyZWkvYXhodmlpdmYuNzE0UEpaZDFpY0RMWFhYVXFWTmEiLCJlbWFpbCI6InRlc3QzQG1haWwucnUiLCJzdXJOYW1lIjoiVGVzdDMiLCJuYW1lIjoiVGVzdDMiLCJfaWQiOiI1NzMxOTRjY2QxNDY2MzhmMTE5Njc4MDcifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NjI5NzU0Nzl9.AAr_kIiZtNiVfFa2K-mbd54ghSWHE7VxRUUwAcJONGo'
describe("For not logged users ",() =>{

    it("Just a simple home request ",(done) => {
        server
            .get("/")
            .end(function(err,res){

                res.body.should.be.instanceOf(Array);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for getting single car info ",(done) => {
        server
            .get("/cars/" + CAR)
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
            .get("/cars/" + FAKE_CAR)
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
            .set({ 'x-access-token' : TOKEN})
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
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.eql({ message: 'UserId,StockId required' });
                res.status.should.equal(404);
                done();
            });
    });

    it("Request for  DELETE item from the basket",(done) => {
        server
            .delete("/cart/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .send({stockId : 1010})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });

    it("Request for  DELETE item fake Order Id",(done) => {
        server
            .delete("/cart/" + FAKE_ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
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
            .put("/cart/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .send({stockId : 1010 , amount : 10})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(200);
                done();
            });
    });


    it("Request for  Update item in the  the basket without amount",(done) => {
        server
            .put("/cart/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .send({stockId : 1010 })
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });


    it("Request for view user own order",(done) => {
        server
            .get("/cart/view/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
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
            .get("/cart/view/" + FAKE_ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
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
            .post("/cart/confirm/" + ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.body.should.have.length(24);
                res.status.should.equal(200);
                done();
            });
    });


    it("Request to confirming user order with FAKE ORDER_ID",(done) => {
        server
            .get("/cart/confirm/" + FAKE_ORDER_ID)
            .set({ 'x-access-token' : TOKEN})
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
    //        .set({ 'x-access-token' : TOKEN})
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
            .set({ 'x-access-token' : TOKEN})
            .end(function(err,res){
                res.body.should.be.instanceOf(Object);
                res.status.should.equal(404);
                done();
            });
    });

});



//describe("For logged users with ADVANCED rules ",() =>{
//
//    it("Deleting user own car from DB",(done) => {
//
//        server
//            .delete("/advanced/cars/")
//            .send({ stockId: 123456})
//            .set({ 'x-access-token' : TOKEN})
//            .end(function(err,res){
//                res.body.should.be.instanceOf(String);
//                res.status.should.equal(200);
//                done();
//            });
//    });
//
//});