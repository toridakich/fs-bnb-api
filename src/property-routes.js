const express = require('express');
const router = express.Router();
const Properties = require('./api/models/property-model');
router.get('/', (req,res)=>{
    Properties.prototype.getAllProperties().then(users=>{
        res.send(users);
    }).catch(err=>{
        res.send(err);
    });
});
router.post('/', (req,res)=>{
    Properties.prototype.createProperty(req.body).then(users=>{
        res.json(users);
    }).catch(err=>{
        res.json(err);
    });
});
router.post('/view', (req,res)=>{
    Properties.prototype.findPropertyById(req.body).then(users=>{
        res.send(users);
    }).catch(err=>{
        res.send(err);
    });
});

router.post('/create', (req,res)=>{
    Properties.prototype.createProperty(req.body).then(users=>{
        res.send(users);
    }).catch(err=>{
        res.send(err);
    });
});

router.post('/start', (req,res)=>{
    Properties.prototype.findPropertyByProviderId(req.body).then(users=>{
        res.send(users);
    }).catch(err=>{
        res.send(err);
    });
});
router.patch('/update', (req,res)=>{
    Properties.prototype.updateProperty(req.body).then(users=>{
        res.send(users);
    }).catch(err=>{
        res.send(err);
    });
});

router.delete('/delete', (req,res)=>{
    Properties.prototype.removeProperty(req.body.id).then(users=>{
        res.send(users);
    }).catch(err=>{
        res.send(err);
    });
});
module.exports = router;