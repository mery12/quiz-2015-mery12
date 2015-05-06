
//GET /author
exports.author = function(req,res){
	res.render('author');
};

var models = require('../models/models.js');

//GET /quizes/question
exports.question = function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question',{pregunta:quiz[0].pregunta})
	})
};

//Autoload
exports.load = function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId='+quizId));}
		}
	).catch(function(error){next(error);});
};


//GET /quizes/:id
exports.show = function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{quiz:quiz});
	})
};

//GET /quizes/:id/answer
exports.answer = function (req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta == quiz.respuesta){
			res.render('quizes/answer',{quiz:quiz,respuesta:'Correcto'});
		}else{
			res.render('quizes/answer',{quiz:quiz,respuesta:'Incorrecto'});
		}
	})
};

//GET /quizes
exports.index = function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{quizes:quizes});
	})
};