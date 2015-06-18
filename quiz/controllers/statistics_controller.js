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
    		models.Comment.count({distinct: '"QuizId"'}).then(function(count){
                if(count==null){count=0;}
                statistics.preg_con_com = count;
                statistics.preg_sin_com = statistics.n_preguntas-count;
                res.render('quizes/statistics/index.ejs', {statistics: statistics, errors: []});
            });
            
    	});
    	
    }).catch(function(error){next(error);});

    
};