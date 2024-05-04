const express = require( 'express' );
const app = express();
const filmeRoutes = express.Router();

let Filme = require( '../model/Filme');

//api to add filme
filmeRoutes.route ('/add').post(function (req,res){
  let filme = new Filme(req.body);
  filme.save()
  .then(filme=>{
    res.status(200).json({'status': 'success', 'mssg': 'filme added sucessfully'});
  }) 
  .catch(err =>{
    res.status(409).send({'status': 'failure', 'mssg': 'unable to save to database'});
  })
});

//api to get filmes
filmeRoutes.route ('/add').get(function (req,res){
  Filme.find(function(err,filmes){
    if(err){
      res.status(400).send({'status': 'failure', 'mssg':'Something went wrong'});
    }
    else{
      res.status(200).json({'status': 'sucess', 'filmes': filmes})
    }
  });
});

//api to get filme
filmeRoutes.route ('/filme/:id').get(function (req,res){
  let id= req.params.id;
  Filme.findById(id, function(err, filme){
    if (err){
      rest.status(400).send({'status': 'failure', 'mssg': 'something went wrong'});
    }
    else{
      res.status(200).json({'status': 'sucess', 'filme': filme});
    }
  })
});

//api to update route
filmeRoutes.route('/update/:id').put(function (req,res){
  Filme.findById(req.params.id, function (err,filme){
    if (!filme) {
      res.status(400).send({'status': 'failure', 'mssg': 'unable to find data'});
    } else {
        filme.nome = req.body.nome;
        filme.diretor = req.body.diretor;
        filme.ano = req.body.ano;

        filme.save().then(filme => { 
          res.status(200).json({ 'status': 'sucess', 'mssg': 'update complete'});
        })
      }
    });
});

//api for delete
filmeRoutes.route ('/delete/:id').delete(function (req,res){
  Filme.findByIdAndRemove({_id: req.params.id }, function (err,){
    if(err){
      res.status(400).send({'status': 'failure', 'mssg':'Something went wrong'});
    }
    else{
      res.status(200).json({'status': 'sucess', 'mssg': 'Delete Successfully'});
    }
  });
});

module.exports = filmeRoutes;
