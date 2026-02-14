const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/streamflix', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Movie = mongoose.model('Movie', {
    title: String,
    category: String,
    url: String,
    free: Boolean
});

app.get('/movies', async (req,res)=>{ const movies=await Movie.find(); res.json(movies); });
app.post('/movies', async (req,res)=>{ const movie=new Movie(req.body); await movie.save(); res.json({status:'success'}); });
app.put('/movies/:id', async (req,res)=>{ await Movie.findByIdAndUpdate(req.params.id,req.body); res.json({status:'updated'}); });
app.delete('/movies/:id', async (req,res)=>{ await Movie.findByIdAndDelete(req.params.id); res.json({status:'deleted'}); });

app.listen(3000,()=>console.log('StreamFlix Backend running on port 3000'));
