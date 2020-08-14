const path        = require('path')
    , express     = require('express')
    , app         = express()
    , dotenv      = require('dotenv')
    , createError = require('http-errors')
    , cors        = require('cors')
    , mongoose    = require('mongoose')
    , router      = require('./routes/index')
    , { seedMentors, seedAddress } = require('./dataSeed');

dotenv.config({ path: './config/config.env'}); 

app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use(express.static(path.join(__dirname, 'public')) );

const port         = process.env.PORT || 5001
    , env          = process.env.NODE_ENV || "development"
    ,configDB      = {
        development: process.env.DB_DEV,
        test: process.env.DB_TEST,
        production: process.env.DB_PROD
    }
    , dbConnection = configDB[env];

if(env === "development" || env === "test") {
    require('dotenv').config({ path: './config.env'})
}

// database seeding
if (env == 'production') {
    seedMentors()
  } else if (env == 'development') {
    seedMentors()
      .then(() => seedAddress())
  }

// Database Connection 
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(dbConnection)
.then(() => console.log('Database connection Successful'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: err});
});

try{
    app.listen(port, () => {
        console.log(`Server is started at ${Date()} in ${env} mode!`);
        console.log(`Listening on Port ${port}!`);
    })
}catch(error){
    handleError(error);
    console.log(error);
};


module.exports = app;

