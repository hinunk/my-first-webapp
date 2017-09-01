var koa = require("koa");
var controller = require("koa-route");
var app = koa();

var views = require("co-views");
var render = views("./view", {
  map: { html: "ejs" }
});
var koa_static = require("koa-static-server");

app.use(
  koa_static({
    rootDir: "./static/",
    rootPath: "/static/",
    maxage: 0
  })
);

app.use(
  controller.get("/route_test", function*() {
    this.set("Cashe-Contorl", "no-cashe");
    this.body = "hello koa";
  })
);

app.use(
  controller.get("/ejs_test", function*() {
    this.set("Cashe-Contorl", "no-cashe");
    this.body = yield render("test", { title: "title_test" });
  })
);

app.listen(3000);
console.log("koa server is started");
