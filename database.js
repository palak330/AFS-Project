const mongoose=require("mongoose");
// mongoose.set('useNewUrlParser',true);
// mongoose.set('useUnifiedTopology',true);
// mongoose.set('useFindAndModify',false);
// mongoose.set('useUnifiedTopology',true);


class Database{

    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect('mongodb://127.0.0.1:27017/twitter')
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  })
    }
}

module.exports=new Database();