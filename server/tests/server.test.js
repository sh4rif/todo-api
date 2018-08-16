const _ = require("lodash");
const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("../server");
const { Todo } = require("../models/todo");
const { User } = require("../models/user");
const { todos, populateTodos, users, populateUsers } = require("./seed/seed");

beforeEach(populateUsers);

// beforeEach(populateTodos);

describe("DELETE /users/me/token", () => {
  it("should remove auth token on logout", done => {
    request(app)
      .delete("/users/me/token")
      // .set(
      //   "x-auth",
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc1OGQ4ZDk3MmI5ZTQ3NjQyZDY0ZWYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM0NDMwNjA1fQ.UjXm5VYFpW1ESVKDxHdsxAouqgmwpH5iS7nNVdY23fU"
      // )
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);

        User.findById(users[0]._id)
          .then(user => {
            expect(user.tokens.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});

// describe("POST /user/login", () => {
//   it("should loging user and return auth token", done => {
//     request(app)
//       .post("/users/loing")
//       .send({ email: users[1].email, password: users[1].password })
//       .expect(200)
//       .expect(res => {
//         expect(res.header["x-auth"]).toExist();
//       })
//       .end((err, res) => {
//         if (err) return done(err);

//         User.findById(users[1]._id)
//           .then(user => {
//             expect(user.tokens[0]).toInclude({
//               access: "auth",
//               token: res.header["x-auth"]
//             });
//             done();
//           })
//           .catch(e => done(e));
//       });
//   });

//   it("should reject invalid login", done => {
//     request(app)
//       .post("/user/login")
//       .send({ email: "usman@mail.com", password: "abc" })
//       .expect(400)
//       .expect(res => {
//         expect(res.header["x-auth"]).toNotExist();
//       })
//       .end((err, res) => {
//         if (err) done(err);

//         User.findOne({ email: "usman@mail.com" })
//           .then(user => {
//             expect(user.tokens.length).toBe(0);
//             done();
//           })
//           .catch(e => done(e));
//       });
//     // done();
//   });
// });

// describe("GET /users/me", () => {
//   // it("should return a user if authenticated", done => {
//   //   var id = new ObjectID("5b75288fd28a6f2e741d2a7f");
//   //   request(app)
//   //     .get("/user/me")
//   //     .set("x-auth", users[0].tokens[0].token)
//   //     .expect(200)
//   //     .expect(res => {
//   //       expect(res.body._id).toBe(users[0]._id.toHexString());
//   //       expect(res.body.email).toBe(users[0].email);
//   //     })
//   //     .end(done);
//   // });

//   it("should return a 401 if not authenticated", done => {
//     request(app)
//       .get("/users/me")
//       .expect(401)
//       .expect(res => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
// });

// describe("POST /users", () => {
//   it("should create a user", done => {
//     const email = "exmaple@example.com";
//     var password = "123mnb!";
//     request(app)
//       .post("/users")
//       .send({ email, password })
//       .expect(200)
//       .expect(res => {
//         expect(res.headers["x-auth"]).toExist();
//         expect(res.body.id).toExist();
//         expect(res.body.email).toBe(email);
//       })
//       .end(err => {
//         if (err) return done(err);

//         User.findOne({ email })
//           .then(user => {
//             expect(user).toExist();
//             expect(user.password).toNotBe(password);
//             done();
//           })
//           .catch(e => done(e));
//       });
//   });

//   it("should return validation error if request invalid", done => {
//     request(app)
//       .post("/users")
//       .send({ email: "invalidemail.com", password: "abc123" })
//       .expect(400)
//       .end(done);
//   });

//   it("should not create user if email in use", done => {
//     request(app)
//       .post({ email: users[0].email, password: "Password1" })
//       .send()
//       .expect(400)
//       .end(done);
//   });
// });

/*******************************TODOS TESTS********************/
// describe("POST /todos", () => {
//   it("should create a new todo", done => {
//     var text = "Test todo text";
//     request(app)
//       .post("/todos")
//       .send({ text })
//       .expect(200)
//       .expect(res => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err, res) => {
//         if (err) return done(err);
//         Todo.find({ text })
//           .then(todos => {
//             expect(todos.length).toBe(1);
//             expect(todos[0].text).toBe(text);
//             done();
//           })
//           .catch(error => done(error));
//       });
//   });

//   it("should not create a todo invalid body data ", done => {
//     request(app)
//       .post("/todos")
//       .send({})
//       .expect(400)
//       .end((err, res) => {
//         if (err) return done(err);
//         Todo.find()
//           .then(todos => {
//             expect(todos.length).toBe(2);
//             done();
//           })
//           .catch(e => done(e));
//       });
//   });
// });

// describe("GET /todos", () => {
//   it("should get all todos", done => {
//     request(app)
//       .get("/todos")
//       .expect(200)
//       .expect(res => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// });

// describe("GET /todos/:todo", () => {
//   it("should return todo doc", done => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.todo.text).toBe(todos[0].text);
//       })
//       .end(done);
//   });

//   it("should return a 404 if todo not found", done => {
//     var id = new ObjectID().toHexString();
//     // console.log("id gen: ", id);
//     request(app)
//       .get(`/todos/${id}`)
//       .expect(404)
//       .end(done);
//   });

//   it("should return a 404 for non object-id", done => {
//     var id = 123;
//     request(app)
//       .get(`/todos/${id}`)
//       .expect(404)
//       .end(done);
//   });
// });

// describe("DELETE /todos/:id", () => {
//   it("should remove a todo", done => {
//     var hexId = todos[1]._id.toHexString();
//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.todo._id).toBe(hexId);
//       })
//       .end((err, res) => {
//         if (err) return done(err);

//         Todo.findById(hexId)
//           .then(todo => {
//             expect(todo).toBeFalsy();
//             done();
//           })
//           .catch(e => done(e));
//       });
//   });

//   it("should return 404 if todo not found", done => {
//     var hexId = new ObjectID().toHexString();
//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(404)
//       .end(done);
//   });

//   it("should return a 404 if object-Id is invalid", done => {
//     request(app)
//       .delete("/todos/123abc")
//       .expect(404)
//       .end(done);
//   });
// });

// describe("PATCH /todos/:id", () => {
//   it("should update the todo", done => {
//     var hexid = todos[0]._id.toHexString();
//     var updateObj = {
//       text: "updated text",
//       completed: true
//     };
//     request(app)
//       .patch(`/todos/${hexid}`)
//       .send(updateObj)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.todo.text).toBe(updateObj.text);
//         expect(res.body.todo.completed).toBe(updateObj.completed);
//         // expect(res.body.todo.completedAt).to("number");
//       })
//       .end((err, res) => {
//         if (err) return done(err);

//         Todo.findById(hexid)
//           .then(todo => {
//             expect(todo.text).toBe(updateObj.text);
//             expect(todo.completed).toBe(updateObj.completed);
//             // expect(todo.completedAt).toBe("Number");
//             done();
//           })
//           .catch(e => done(e));
//       });
//   });

//   it("should clear completedAt when todo is not completed", done => {
//     var hexId = todos[1]._id.toHexString();
//     var updatedObj = {
//       completed: false
//     };
//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send(updatedObj.completed)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.todo.completed).toBe(updatedObj.completed);
//         expect(res.body.todo.completedAt).toBeFalsy();
//       })
//       .end((err, res) => {
//         if (err) return done(err);

//         Todo.findById(hexId)
//           .then(todo => {
//             expect(todo.completed).toBe(updatedObj.completed);
//             expect(todo.completedAt).toBeFalsy();
//             done();
//           })
//           .catch(e => done(e));
//       });
//   });
// });
