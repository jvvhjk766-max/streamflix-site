const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// قاعدة البيانات
mongoose.connect('mongodb://localhost:27017/streamflix')
    .then(()=>console.log('✅ MongoDB connected successfully'))
    .catch(err=>console.error('❌ MongoDB connection error:', err));

// نماذج البيانات
const Movie = mongoose.model('Movie',{title:String,category:String,url:String,free:Boolean});
const User = mongoose.model('User',{name:String,email:String,subscription:{type:String,default:'Free'}});

// Routes
app.get('/movies', async (req,res)=>{ 
    const movies=await Movie.find(); res.json(movies); 
});

app.post('/movies', async (req,res)=>{ 
    const movie=new Movie(req.body); await movie.save(); res.json({status:'success'}); 
});

app.put('/movies/:id', async (req,res)=>{ 
    await Movie.findByIdAndUpdate(req.params.id,req.body); res.json({status:'updated'}); 
});

app.delete('/movies/:id', async (req,res)=>{ 
    await Movie.findByIdAndDelete(req.params.id); res.json({status:'deleted'}); 
});

// Users
app.post('/users', async (req,res)=>{ 
    const user=new User(req.body); await user.save(); res.json({status:'user_created'}); 
});

app.put('/users/:id/subscription', async (req,res)=>{ 
    await User.findByIdAndUpdate(req.params.id,{subscription:req.body.subscription}); 
    res.json({status:'subscription_updated'}); 
});

// تشغيل السيرفر
const PORT=3000;
app.listen(PORT,()=>console.log(`✅ StreamFlix Pro Backend running on port ${PORT}`));
