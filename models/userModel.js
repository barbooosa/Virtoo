const mongoose = require("mongoose")
const bcrypt = require('bcrypt');



//cria a tabela login do Aluno
const loginals = mongoose.model('loginals',{
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    birthday:{
      type:String,
      required:true,
      index:true,
    },
    cpf:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fone:{
      type:String,
      required:true,
      unique:true,
      index:true,
    },
    endereco:{
        type:String,
        required:true,
    },
    matricu:{
        type:String,
        required:true,
        unique:true,
    },
    curso:{
      type:String,
      required:true,
      index:true,
    },
    periodo:{
        type:String,
        required:true,
    },
    turno:{
        type:String,
        required:true,
        unique: false
        index:true,
    },
});

//cria a tabela login dos Professores
const loginprs = mongoose.model('loginprs',{
  name:{
    type:String,
    required:true,
    unique:true,
    index:true,
  },
  sex:{
    type:String,
    required:true,
    index:true,
  },
  estadocivil:{
      type:String,
      required:true,
  },
  birthday:{
    type:String,
    required:true,
    index:true,
  },
  cpf:{
      type:String,
      required:true,
      unique:true,
  },
  email:{
      type:String,
      required:true,
      unique:true,
  },
  fone:{
    type:String,
    required:true,
    unique:true,
    index:true,
  },
  endereco:{
      type:String,
      required:true,
  },
  materia:{
    type:String,
    required:true,
    index:true,
    unique: false,
  },
  turno:{
      type:String,
      required:true,
      unique: false,
  },
    numberidentify:{
      type:String,
      required:true,
      unique:true,
  },

});


