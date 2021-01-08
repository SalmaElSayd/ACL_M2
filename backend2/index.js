
const {app}=require('./app.js')
const mongoose =require('mongoose') 
const cors = require('cors');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true })
.then(console.log('Successfully connected to database'))

app.use(cors());


app.listen(process.env.PORT)
