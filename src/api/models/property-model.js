var mysqlConn = require("../database/database");
module.exports = class Properties{
    async getAllProperties(){
        return new Promise((resolve,reject)=>{
            mysqlConn.query("SELECT * FROM listing",function(err,res){
                if(err){
                
                    reject(err)
                }else{
                    resolve(res);
                }

            })
          
        })
    }

    findPropertyById(propertyId){
        return new Promise((resolve, reject)=>{
            console.log({"id":propertyId})
            mysqlConn.query("Select * from listing where id=?",propertyId.id, (err,res)=>{
                if(err){
                    reject(err);
                }else{
                    console.log({"res":res});
                    resolve(res);
                }
            })
        })
    };

    findPropertyByProviderId(providerId){
        return new Promise((resolve, reject)=>{
            console.log({"id":providerId})
            mysqlConn.query("Select * from listing where providerId=?",providerId, (err,res)=>{
                if(err){
                    reject(err);
                }else{
                    console.log({"res":res});
                    resolve(res);
                }
            })
        })
    };

    async createProperty(property){
        return new Promise((resolve,reject)=>{
            mysqlConn.query("INSERT INTO listing set ?", property, (err, res) => {
                if(err){
                    
                    reject(err)
                }else{
                    resolve(res);
                }

            })
              
        })
    }


updateProperty(edits){
    console.log(edits);
    return new Promise ((resolve,reject)=>{
        mysqlConn.query(
            "UPDATE listing SET title=?, description=? ,location=? ,pricePerNight=? ,imgURL=?  WHERE id = ?",
            [edits.title, edits.description,edits.location,edits.pricePerNight,edits.imgURL, edits.id],
            (err, res) => {
                if(err){
                    console.log(err);
                    
                    reject(err)
                }else{
                    resolve(res);
                }

            })
              
        })
    }
    removeProperty(propertyId) {
        return new Promise ((resolve,reject)=>{
        mysqlConn.query("DELETE FROM listing WHERE id = ?", propertyId, (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        });
    })
      };
    
}