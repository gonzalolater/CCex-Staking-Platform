var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var Book = require('../models').Book;

chai.use(chaiHttp);

describe('Book API', function(){
    //Before each test we empty the database
    beforeEach(function(done){
        Book.destroy({
            where: {},
            truncate: true
        });
        done();
    });
    describe('/GET books', function(){
        it('Getting all books', function(done){
            chai.request(app).get('/books').end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });
    describe('/POST books', function(){
        it('Insert new book', function(done){
            var book = {
                title: 'Jack Ma',
                author: 'Chen Wei',
                category: 'Biography'
            }
            chai.request(app).post('/books').send(book).end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });
    describe('/GET/:id books', function(){
        it('Get book by id', function(done){
            Book.create({
                title: 'Jack Ma',
                author: 'Chen Wei',
                category: 'Biography'
            }).then(function(book){
                chai.request(app).get('/books/'+book.id).end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
        it('Get book by not existed id', function(done){
            chai.request(app).get('/books/100').end(function(err, res){
                res.should.have.status(400);
                res.body.should.equal('Book not found');
                done();
            })
        });
        it('Get book by invalid id', function(done){
            chai.request(app).get('/books/abc').end(function(err, res){
                res.should.have.status(400);
                res.body.should.equal('Invalid ID supplied');
                done();
            });
        });
    });
    describe('/PUT/:id books', function(){
        it('Update book by id', function(done){
            Book.create({
                title: 'Jack Ma',
                author: 'Chen Wei',
                category: 'Biography'
            }).then(function(book){
                var bookEdit = {
                    title: 'Amor Fati',
                    author: 'Rando Kim',
                    category: 'Non Fiction'
                }
                chai.request(app).put('/books/'+book.id).send(bookEdit).end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            })
        });
    });
    describe('/DELETE/:id books', function(){
        it('Delete book by id', function(done){
            Book.create({
                title: 'Jack Ma',
                author: 'Chen Wei',
                category: 'Biography'
            }).then(function(book){
                chai.request(app).delete('/books/'+book.id).end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.equal(1);
                    done();
                });
            })
        });
    });
});