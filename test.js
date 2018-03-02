require('./');
const supertest = require('supertest');
const express = require('express');
const {expect} = require('chai');
const methods = ['get', 'delete', 'post', 'patch', 'put'];

describe('express async await', () => {
  let app;
  let request;

  beforeEach(() => {
    app = express();
    request = supertest(app);
  });

  methods.forEach(method => {
    describe(`${method.toUpperCase()}`, () => {
      describe('.all', () => {
        it(`should catch exceptions 2 args`, async () => {
          app.all('/', async (req, res) => {
            throw new Error('Whoops!');
          });

          app.use((err, req, res, next) => {
            res.status(500).end(err.message);
          });

          const {text} = await request[method]('/').expect(500);
          expect(text).to.be.equal('Whoops!');
        });

        it(`should catch exceptions 3 args`, async () => {
          app.all('/', async (req, res, next) => {
            throw new Error('Whoops!');
          });

          app.use((err, req, res, next) => {
            res.status(500).end(err.message);
          });

          const {text} = await request[method]('/').expect(500);
          expect(text).to.be.equal('Whoops!');
        });

        it(`should catch exceptions 4 args`, async () => {
          app.all('/', async (err, req, res, next) => {
            throw new Error('Whoops!');
          });

          app.use((err, req, res, next) => {
            res.status(500).end(err.message);
          });

          const {text} = await request[method]('/').expect(500);
          expect(text).to.be.equal('Whoops!');
        });
      }); // .all

      describe('.use', () => {
        it(`should catch exceptions 2 args`, async () => {
          app.use(async (req, res) => {
            throw new Error('Whoops!');
          });

          app.use((err, req, res, next) => {
            res.status(500).end(err.message);
          });

          const {text} = await request[method]('/').expect(500);
          expect(text).to.be.equal('Whoops!');
        });

        it(`should catch exceptions 3 args`, async () => {
          app.use(async (req, res, next) => {
            throw new Error('Whoops!');
          });

          app.use((err, req, res, next) => {
            res.status(500).end(err.message);
          });

          const {text} = await request[method]('/').expect(500);
          expect(text).to.be.equal('Whoops!');
        });

        it(`should catch exceptions 4 args`, async () => {
          app.use(async (err, req, res, next) => {
            throw new Error('Whoops!');
          });

          app.use((err, req, res, next) => {
            res.status(500).end(err.message);
          });

          const {text} = await request[method]('/').expect(500);
          expect(text).to.be.equal('Whoops!');
        });
      }); // .use

      it(`should catch exceptions 2 args`, async () => {
        app[method]('/', async (req, res) => {
          throw new Error('Whoops!');
        });

        app.use((err, req, res, next) => {
          res.status(500).end(err.message);
        });

        const {text} = await request[method]('/').expect(500);
        expect(text).to.be.equal('Whoops!');
      });

      it(`should catch exceptions 3 args`, async () => {
        app[method]('/', async (req, res, next) => {
          throw new Error('Whoops!');
        });

        app.use((err, req, res, next) => {
          res.status(500).end(err.message);
        });

        const {text} = await request[method]('/').expect(500);
        expect(text).to.be.equal('Whoops!');
      });

      it(`should catch exceptions 4 args`, async () => {
        app[method]('/', async (err, req, res, next) => {
          throw new Error('Whoops!');
        });

        app.use((err, req, res, next) => {
          res.status(500).end(err.message);
        });

        const {text} = await request[method]('/').expect(500);
        expect(text).to.be.equal('Whoops!');
      });
    });
  });
});
