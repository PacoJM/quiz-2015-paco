var models = require('../models/models.js');


exports.index= function(req, res){
	var statistics={ n_preguntas: ' -- ',
            n_comentarios: ' -- ',
            promedio_comentarios: ' -- ',
            preg_sin_com: ' -- ',
            preg_con_com: ' -- ',
            };

    models.Quiz.count().then(function(count){
    	statistics.n_preguntas=count;
    	models.Comment.count().then(function(count){
    		statistics.n_comentarios=count;
    		statistics.promedio_comentarios=statistics.n_comentarios/statistics.n_preguntas;
    		res.render('quizes/statistics/index.ejs', {statistics: statistics, errors: []});
    	});
    	
    });

    
};