'use strict';

var qs       = require('querystring');

var APIUtils = require('./APIUtils');

var QuizAPI = {

  getQuestionSuggestions: function(tags) {
    var query = {
      tags: tags.join(',')
    };

    return APIUtils.get('quiz/suggestions?' + qs.stringify(query));
  },

  saveQuestion: function(quizId, question) {
    return APIUtils.post('quiz/' + quizId + '/question', question);
  },

  saveAnswers: function(quizId, questionId, answers) {
    return APIUtils.post('quiz/' + quizId + '/question/' + questionId + '/answers', answers);
  },

  getQuestion: function(quizId, currentQuestionNumber, userScore) {
    var params = qs.stringify({
      current: currentQuestionNumber,
      score: userScore
    });

    return APIUtils.get('quiz/' + quizId + '/question?' + params);

    // deferred.resolve({
    //   id: 0,
    //   body: 'What is the capitol of Maine?',
    //   type: 'multi',
    //   answers: [
    //     {
    //       id: 1,
    //       body: 'Augusta'
    //     },
    //     {
    //       id: 2,
    //       body: 'Portland'
    //     },
    //     {
    //       id: 3,
    //       body: 'Brewer'
    //     },
    //     {
    //       id: 4,
    //       body: 'Bangor'
    //     }
    //   ]
    // });
  },

  checkAnswer: function(quizId, questionId, answer) {
    return APIUtils.post('quiz/'+ quizId + '/check/' + questionId, answer);

    // deferred.resolve(true);
  },

  markComplete: function(lessonId, quizId) {
    return APIUtils.post('lesson/' + lessonId + '/quiz/' + quizId + '/complete');
  }

};

module.exports = QuizAPI;