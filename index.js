const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const config = require('./config/db');
const account = require('./routes/account');
const session = require('express-session');
const Excursion = require('./models/book');


const app = express();

const port = process.env.PORT || 3000;

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db);

mongoose.connection.on('connected', () =>{
    console.log("Ok")
})

mongoose.connection.on('error', (err) =>{
    console.log("Error: " + err)
});

app.use('/account', account);
let newExcursion1 = new Excursion({
    name:"Екскурсія територією музею «Звідки починався Київ»",
    src:"https://tickikids.ams3.cdn.digitaloceanspaces.com/z1.cache/gallery/activities/59380/image_6273d6ad82a491.40322783.jpg       ",
    category:"діти від 8 років та дорослі",
    duration:45,
    count: "1–15 осіб",
    cost:250,
    desc: "Екскурсія Старокиївською горою, найдавнішою частиною Києва. Під час заходу ви дізнаєтеся, коли та як виникло наше місто, про утворення держави Русь, відвідаєте місця, де колись височіли князівські палаци. Поговоримо про політичні інтриги перших князів, хрещення Русі, боротьбу з язичництвом і будівництво першого кам’яного храму – Десятинної церкви."
  });
let newExcursion2 = new Excursion({
  name:"Екскурсія територією музею «На горі Старокиївський... Археологи про древній Київ»",
  src:"https://vechirniy.kyiv.ua/uploads/2022/05/24/746.jpg",
  category:"діти від 8 років та дорослі",
  duration:90,
  count: "1–15 осіб",
  cost:750,
  desc: "Національний музей історії України розміщений у історичному центрі Києва – на Старокиївській горі, місці, де колись постало одне з наймальовничіших міст Європи. Під час екскурсії наші археологи розкажуть про історію виникнення Києва та археологічні дослідження в ньому. Ви поподорожуєте літописним «градом Кия» і «градом Володимира», дізнаєтеся про виникнення давньоруської держави та перших київських князів. Обов’язково відвідаєте фундаменти древніх кам’яних палаців та Десятинної церкви – першого кам’яного храму Києва, який став останнім прихистком для киян у 1240 році."
});
  let newExcursion3 = new Excursion({
    name:"Екскурсія історичною частиною Києва (Старокиївська гора – Золоті Ворота) «Київ крізь віки»",
    src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Golden_Gate_Kiev_2018_G1.jpg/420px-Golden_Gate_Kiev_2018_G1.jpg",
    category:"діти від 8 років та дорослі",
    duration:90,
    count: "1–15 осіб",
    cost:750,
    desc: "Національний музей історії України розміщений у історичному центрі Києва – на Старокиївській горі, місці, де колись постало одне з наймальовничіших міст Європи. Під час екскурсії наші археологи розкажуть про історію виникнення Києва та археологічні дослідження в ньому. Ви поподорожуєте літописним «градом Кия» і «градом Володимира», дізнаєтеся про виникнення давньоруської держави та перших київських князів. Обов’язково відвідаєте фундаменти древніх кам’яних палаців та Десятинної церкви – першого кам’яного храму Києва, який став останнім прихистком для киян у 1240 році."
  });
  newExcursion1.save()
  newExcursion2.save()
  newExcursion3.save()

app.listen(port, "0.0.0.0", () =>{
    console.log("Server work on "+ port)
})