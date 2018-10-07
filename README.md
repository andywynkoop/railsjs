# RailsJS
 RailsJS is a Node.js web application framework modeled after Rails. It provides a boilerplate MVC server architecture that renders a single-page react application on the front-end. The server is pre-configured to nest all API routes under a `/api/` namespace to make it compatible with front-end routing. The controllers come preloaded with an active-record-inspired ORM for interacting with a mongoDB database.

## Creating a new project
+ Run `npm install -g reactjs` to install the reactjs cli. 
+ Create a new project in your current directory by running `railsjs new <YourAppName>`.
  - A new folder will be created at the current directory containing your RailsJs app.
  - All dependencies will be installed automatically
  - webpack will bundle the contents of `frontend/index.js` into `dist/main.js`

+ After setup is complete, `cd` into your newly created app and run `railsjs server` to start your server.

## Connecting to a MongoDB instance
By default, the RailsJS server will try to connect to a local MongoDB instance at `mongodb://localhost:27017/<YourAppName>`, and will automatically create a new database by that name if one doesn't already exist. This default behavior requires that you have MongoDb installed locally on your machine. Directions for installing MongoDB can be found [here][MongoDB-Installation].

#### Using a Cloud-Hosted MongoDB Instance
If you'd prefer to use a cloud-hosted MongoDB instance (such as mLab), you can override this default behavior by setting a custom `MONGO_URI` key in the `config/db.config.js` file:

```JS
// config/db.config.js
module.exports = {
  MONGO_URI: "mongodb:// ..."
}
```

[MongoDB-Installation]:https://docs.mongodb.com/manual/installation/

## Configuring the Router
Define server-side routes in the `config/routes.js` file. The routes file exports a function that takes in a Router object as an argument. The router has functions to define `get`, `post`, `patch`, and `delete` routes, which can be called inside this function with `path`, `controller`, and `action` arguments. For instance:

```JS
//config/routes.js

module.exports = router => {
  //user routes
  router.get('/users', UsersController, "index");
  router.post('/users', UsersController, "create");
  router.get('/users/:id', UsersController, "show");
  //post routes
  router.get('/posts', PostsController, "index");
  router.post('/posts', PostsController, "create");
}
```
+ The `path` argument can be any string representing the path to match on the request path. 
+ Wildcard variables can be prefixed with `:`. For instance, `/users/:id`, will match a request to `/users/5` and an `id` key will be set to `5` inside of the `Route#params` object.
+ The `controller` argument can be any controller defined inside of the `controllers` folder. `UsersController` will be defined locally if you have a file: `/controllers/usersController`.
+ Controllers do not need to be explicitly imported into the route file.
+ `action` is the name of the controller function that should be invoked when the request matches the path

#### Namespacing API routes
The default configuration for the router places all defined routes under a `/api` namespace to make it more compatible with frontend routing. This means that all requests to `/api/*` will be sent to the router while all other requests will serve `dist/index.html`. 
For instance, a request to `/api/users` will match a route defined with `path:` `'/users'`.
If you'd like to use a different namespace for your API endpoints, you can change the `namespace` key in `config/router.config.js`. If you'd prefer not to use a namespace, set this key to an empty string.

## Controllers
Define controllers inside of the `/controllers` directory. Controller filenames should be written in `camelCase`, and prefixed with the pluralized name of the model they refer to. For instance, a controller for the `User` model should be named `usersController.js`. Inside of the file, Define and export a new class that extends `ApplicationController`. Define the constructor function to take it a props argument and call `super(props)`. A basic controller skeleton might look like this:

```JS
// controllers/dogsController.js

class DogsController extends ApplicationController {
  constructor(props) {
    super(props);
  }

  // define actions here
}

export default DogsController;
```

+ Note: All controllers can implicitly reference all defined models, as well as the ApplicationController.


### Controller Actions

Actions are functions defined on the controller prototype. Any actions defined in a controller can be referenced when defining routes.

### Session
RailsJS includes a `session` for each user of the app. You can call `this.session` anywhere inside of your controllers to access the `Session` instance. Use `this.session.get(key)` and `this.session.set(key, value)` to store information between requests.
####

## Schema
You can optionally define contraints on your models by defining a `schema` in the `/schema` directory. To define a schema for a model, make a new file with the same as the model you want to enforce attributes on. In your file, define and export an object with keys value pairs representing the attribute and any contraints you want to place on it:

```JS
// schema/User.js
module.exports = {
  username: { type: "String", required: true, unique: true },
  postIds: "Array",
  sessionToken: "String",
  passwordDigest: "String"
}
```

If you provide a string for the attribute value, RailsJS will enforce that only this data type can be assigned to this key. Value types include `String`, `Number`, `Array`, or `Object`.
Note: You do not need to specify `ID`.

You can also provide an object to specify additional constraints. Supported configuration options are `type`, `required`, and `unique`.

## Models

#### DB methods


## Associations


