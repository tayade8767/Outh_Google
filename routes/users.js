var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://akashtayade5668:tayade8767@cluster0.nqzcjpj.mongodb.net/?retryWrites=true&w=majority');

const userSchema = mongoose.Schema({
  email : String,
  name : String
})

module.exports = mongoose.model('user', userSchema);