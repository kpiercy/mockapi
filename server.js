require("dotenv").config();

const express = require("express");
var cors = require("cors");
const app = express();
const pubip = require("express-ip");
const logger = require("morgan");
const fs = require('fs-extra')
const path = require('path')
const fileStreamRotator = require("file-stream-rotator");

//middleware
const publimiter = require("./middleware/publimiter");
const authenticateToken = require("./middleware/authToken");
const authAccess = require("./middleware/access");
const authIP = require("./middleware/ipAccess");
const apiErrorHandler = require("./errors/api-error-handler");

// app.set("views", "views");
// app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(pubip().getIpInfoMiddleware);
//This will ensure log directory exists for acccess logs
const logsFolder = __dirname + "/accessLog";
fs.existsSync(logsFolder) || fs.mkdirSync(logsFolder);
//Create a log stream here
const rotatingLogStream = fileStreamRotator.getStream({
    filename: `${logsFolder}/access-%DATE%.log`,
    frequency: "daily",
    verbose: false,
    date_format: "YYYY-MM-DD",
    max_logs: 45, //Keep for 45 days
});

app.use(logger("combined", {stream: rotatingLogStream}));
app.use(logger("dev"));
app.use(apiErrorHandler);

const indexRoutes = require("./routes/index");
const fileRoutes = require("./routes/files");
const clientRoutes = require("./routes/clients");
const serviceRoutes = require("./routes/services");
const invoiceRoutes = require("./routes/invoices");
const creditRoutes = require("./routes/credits");
const depositRoutes = require("./routes/deposits");
const contractRoutes = require("./routes/contracts");
const priceRoutes = require("./routes/prices");
const jobRoutes = require("./routes/jobs");
const facilityRoutes = require("./routes/facilities");
const proofRoutes = require("./routes/proofs");
const downloadRoutes = require("./routes/downloads");
const contactRoutes = require("./routes/contacts");
const orbipayRoutes = require("./routes/orbipays");
const orderRoutes = require("./routes/orders");
const versionRoutes = require("./routes/versions");
const insertRoutes = require("./routes/inserts");
const messageRoutes = require("./routes/messages");
const logoRoutes = require("./routes/logos");
const patientRoutes = require("./routes/patients");
const encounterRoutes = require("./routes/encounters");
const detailRoutes = require("./routes/details");


///////////////endpoint routes ////////////////

/*
Dynamic routes are handled via split routing starting inside ./routes/clients, using router.use for any appended sub-path. For example, if you call the /clients/:clientid/jobs/:jobid/orders/ endpoint, the program hits the clientRoutes, then using the router, identifies the req.url has /jobs/:jobid and then goes into the jobRoutes, inside jobs.js it then identifies that the req.url has /orders in the path and then uses the orders module to fulfill the request.

Static routes are handled via the list of app.use below, whereby it calls the given module directly. Routes are wrapped in an if statement that determine if the req.url is static or dynamic based on the path, thus allowing interaction via either method.

All of the same capabilities are open to Static and Dynamic requests. The difference being that when using the static routes, you will need to provide details like the clientid, orderid, ... params via JSON body in most cases. 
*/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Origin-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/", indexRoutes);
app.use("/api/v1/clients", clientRoutes); //crud
app.use("/api/v1/services", serviceRoutes); //cru
app.use(
  "/api/v1/clients/invoices",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  invoiceRoutes
); //cru
app.use(
  "/api/v1/clients/invoices/credits",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  creditRoutes
); //cru
app.use(
  "/api/v1/clients/invoices/deposits",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  depositRoutes
); //cru
app.use(
  "/api/v1/clients/contracts",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  contractRoutes
); //crud
app.use(
  "/api/v1/clients/contracts/prices",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  priceRoutes
); //cru
app.use(
  "/api/v1/clients/jobs",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  jobRoutes
);
app.use(
  "/api/v1/clients/jobs/proofs",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  proofRoutes
);
app.use(
  "/api/v1/clients/jobs/downloads",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  downloadRoutes
); //crud
app.use(
  "/api/v1/clients/jobs/contacts",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  contactRoutes
); //crud
app.use(
  "/api/v1/clients/jobs/orbipays",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  orbipayRoutes
); //crud
app.use(
  "/api/v1/clients/jobs/orders",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  orderRoutes
); //cru
app.use(
  "/api/v1/clients/jobs/facilities",
  publimiter,
  authenticateToken,
  authAccess,
  authIP,
  facilityRoutes
);
// app.use('/api/v1/clients/jobs/orders/versions', versionRoutes)
// app.use('/api/v1/clients/jobs/orders/versions/files', fileRoutes)  //should files belong to /orders instead of /versions??
// app.use('/api/v1/clients/jobs/orders/versions/files/inserts', insertRoutes) //should inserts belong to /jobs/orders/files??
// app.use('/api/v1/clients/jobs/orders/versions/files/patients', patientRoutes)
// app.use('/api/v1/clients/jobs/orders/versions/files/patients/encounters', encounterRoutes)
// app.use('/api/v1/clients/jobs/orders/versions/files/patients/encounters/details', detailRoutes)

//api/v1/clients/jobs/facilities/statements/encounters/charges/payments
//api/v1/clients/jobs/facilities/statements/encounters/charges/adjustments
//api/v1/clients/jobs/facilities/statements/encounters/charges/transfers

///////////////endpoint routes////////////////

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log("server is running at port " + port);
