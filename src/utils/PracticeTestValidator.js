/* ==========================================================================
   PRACTICE TEST VALIDATOR - DATASET VALIDATION UTILITY
   Validates practice test dataset for answer keys, question counts, and data integrity
   ========================================================================== */

window.PracticeTestValidator = {
  // Validate all practice tests
  validateAll: function(tests) {
    var results = [];
    var self = this;
    
    if (!tests || !Array.isArray(tests)) {
      console.error('Invalid tests data');
      return [];
    }
    
    tests.forEach(function(test, testIndex) {
      var testResult = {
        testId: test.id,
        testTitle: test.title,
        errors: [],
        warnings: []
      };
      
      // Validate reading section
      if (test.reading) {
        var readingValidation = self.validateReading(test.reading, test.answerKey ? test.answerKey.reading : null);
        testResult.errors = testResult.errors.concat(readingValidation.errors);
        testResult.warnings = testResult.warnings.concat(readingValidation.warnings);
      }
      
      // Validate listening section
      if (test.listening) {
        var listeningValidation = self.validateListening(test.listening, test.answerKey ? test.answerKey.listening : null);
        testResult.errors = testResult.errors.concat(listeningValidation.errors);
        testResult.warnings = testResult.warnings.concat(listeningValidation.warnings);
      }
      
      // Review-only entries may not contain objective questions, so they do not need an answer key.
      var hasObjectiveQuestions = !!(
        (test.reading && test.reading.passages && test.reading.passages.some(function(p) { return p.questions && p.questions.length > 0; })) ||
        (test.listening && (
          (test.listening.part1 && test.listening.part1.questions && test.listening.part1.questions.length > 0) ||
          (test.listening.part2 && test.listening.part2.conversations && test.listening.part2.conversations.some(function(c) { return c.questions && c.questions.length > 0; })) ||
          (test.listening.part3 && test.listening.part3.talks && test.listening.part3.talks.some(function(t) { return t.questions && t.questions.length > 0; }))
        ))
      );
      if (hasObjectiveQuestions && !test.answerKey) {
        testResult.warnings.push('Missing answerKey object');
      }
      
      // Validate question options count
      if (test.reading) {
        var optionsValidation = self.validateQuestionOptions(test.reading, 'Reading');
        testResult.errors = testResult.errors.concat(optionsValidation.errors);
        testResult.warnings = testResult.warnings.concat(optionsValidation.warnings);
      }
      
      if (test.listening) {
        var listeningOptionsValidation = self.validateListeningOptions(test.listening);
        testResult.errors = testResult.errors.concat(listeningOptionsValidation.errors);
        testResult.warnings = testResult.warnings.concat(listeningOptionsValidation.warnings);
      }
      
      // Validate for garbage data
      if (test.reading) {
        var garbageValidation = self.validateGarbageData(test.reading, 'Reading');
        testResult.errors = testResult.errors.concat(garbageValidation.errors);
        testResult.warnings = testResult.warnings.concat(garbageValidation.warnings);
      }
      
      if (test.listening) {
        var listeningGarbageValidation = self.validateListeningGarbageData(test.listening);
        testResult.errors = testResult.errors.concat(listeningGarbageValidation.errors);
        testResult.warnings = testResult.warnings.concat(listeningGarbageValidation.warnings);
      }
      
      results.push(testResult);
    });
    
    return results;
  },
  
  // Validate reading section
  validateReading: function(readingData, answerKey) {
    var errors = [];
    var warnings = [];
    var questionCount = 0;
    
    // Count questions from passages
    if (readingData.passages) {
      readingData.passages.forEach(function(passage) {
        if (passage.questions) {
          questionCount += passage.questions.length;
        }
      });
    }
    
    // Validate answer key
    if (answerKey) {
      if (answerKey.length !== questionCount) {
        errors.push('Reading answer key has ' + answerKey.length + ' answers but ' + questionCount + ' questions');
      }
      
      // Check if answers match question answers
      if (readingData.passages) {
        var answerIndex = 0;
        readingData.passages.forEach(function(passage) {
          if (passage.questions) {
            passage.questions.forEach(function(question) {
              if (answerIndex < answerKey.length) {
                var expectedAnswer = question.answer;
                var actualAnswer = answerKey[answerIndex];
                if (expectedAnswer !== actualAnswer) {
                  warnings.push('Reading question ' + question.id + ' answer mismatch: expected ' + expectedAnswer + ' but answerKey has ' + actualAnswer);
                }
              }
              answerIndex++;
            });
          }
        });
      }
    } else {
      warnings.push('Reading answer key is missing');
    }
    
    return { errors: errors, warnings: warnings };
  },
  
  // Validate listening section
  validateListening: function(listeningData, answerKey) {
    var errors = [];
    var warnings = [];
    var questionCount = 0;
    
    // Count questions from all parts
    if (listeningData.part1 && listeningData.part1.questions) {
      questionCount += listeningData.part1.questions.length;
    }
    
    if (listeningData.part2 && listeningData.part2.conversations) {
      listeningData.part2.conversations.forEach(function(conv) {
        if (conv.questions) {
          questionCount += conv.questions.length;
        }
      });
    }
    
    if (listeningData.part3 && listeningData.part3.talks) {
      listeningData.part3.talks.forEach(function(talk) {
        if (talk.questions) {
          questionCount += talk.questions.length;
        }
      });
    }
    
    // Validate answer key
    if (answerKey) {
      if (answerKey.length !== questionCount) {
        errors.push('Listening answer key has ' + answerKey.length + ' answers but ' + questionCount + ' questions');
      }
      
      // Check if answers match question answers
      var answerIndex = 0;
      
      if (listeningData.part1 && listeningData.part1.questions) {
        listeningData.part1.questions.forEach(function(question) {
          if (answerIndex < answerKey.length) {
            var expectedAnswer = question.answer;
            var actualAnswer = answerKey[answerIndex];
            if (expectedAnswer !== actualAnswer) {
              warnings.push('Listening Part 1 question ' + question.id + ' answer mismatch: expected ' + expectedAnswer + ' but answerKey has ' + actualAnswer);
            }
          }
          answerIndex++;
        });
      }
      
      if (listeningData.part2 && listeningData.part2.conversations) {
        listeningData.part2.conversations.forEach(function(conv) {
          if (conv.questions) {
            conv.questions.forEach(function(question) {
              if (answerIndex < answerKey.length) {
                var expectedAnswer = question.answer;
                var actualAnswer = answerKey[answerIndex];
                if (expectedAnswer !== actualAnswer) {
                  warnings.push('Listening Part 2 question ' + question.id + ' answer mismatch: expected ' + expectedAnswer + ' but answerKey has ' + actualAnswer);
                }
              }
              answerIndex++;
            });
          }
        });
      }
      
      if (listeningData.part3 && listeningData.part3.talks) {
        listeningData.part3.talks.forEach(function(talk) {
          if (talk.questions) {
            talk.questions.forEach(function(question) {
              if (answerIndex < answerKey.length) {
                var expectedAnswer = question.answer;
                var actualAnswer = answerKey[answerIndex];
                if (expectedAnswer !== actualAnswer) {
                  warnings.push('Listening Part 3 question ' + question.id + ' answer mismatch: expected ' + expectedAnswer + ' but answerKey has ' + actualAnswer);
                }
              }
              answerIndex++;
            });
          }
        });
      }
    } else {
      warnings.push('Listening answer key is missing');
    }
    
    return { errors: errors, warnings: warnings };
  },
  
  // Print validation results to console
  printResults: function(results) {
    console.log('=== PRACTICE TEST VALIDATION RESULTS ===');
    
    var totalErrors = 0;
    var totalWarnings = 0;
    
    results.forEach(function(result) {
      console.log('\n--- Test: ' + result.testTitle + ' (' + result.testId + ') ---');
      
      if (result.errors.length === 0 && result.warnings.length === 0) {
        console.log('✅ No issues found');
      } else {
        result.errors.forEach(function(error) {
          console.log('❌ ERROR: ' + error);
          totalErrors++;
        });
        
        result.warnings.forEach(function(warning) {
          console.log('⚠️  WARNING: ' + warning);
          totalWarnings++;
        });
      }
    });
    
    console.log('\n=== SUMMARY ===');
    console.log('Total errors: ' + totalErrors);
    console.log('Total warnings: ' + totalWarnings);
    console.log('Tests validated: ' + results.length);
  },
  
  // Validate that all questions have exactly 4 options
  validateQuestionOptions: function(sectionData, sectionName) {
    var errors = [];
    var warnings = [];
    
    if (sectionData.passages) {
      sectionData.passages.forEach(function(passage, passageIndex) {
        if (passage.questions) {
          passage.questions.forEach(function(question, questionIndex) {
            if (!question.options || question.options.length !== 4) {
              errors.push(sectionName + ' Passage ' + (passageIndex + 1) + ' Question ' + question.id + ' has ' + (question.options ? question.options.length : 0) + ' options instead of 4');
            }
          });
        }
      });
    }
    
    return { errors: errors, warnings: warnings };
  },
  
  // Validate listening section options
  validateListeningOptions: function(listeningData) {
    var errors = [];
    var warnings = [];
    
    if (listeningData.part1 && listeningData.part1.questions) {
      listeningData.part1.questions.forEach(function(question) {
        if (!question.options || question.options.length !== 4) {
          errors.push('Listening Part 1 Question ' + question.id + ' has ' + (question.options ? question.options.length : 0) + ' options instead of 4');
        }
      });
    }
    
    if (listeningData.part2 && listeningData.part2.conversations) {
      listeningData.part2.conversations.forEach(function(conv, convIndex) {
        if (conv.questions) {
          conv.questions.forEach(function(question) {
            if (!question.options || question.options.length !== 4) {
              errors.push('Listening Part 2 Conversation ' + (convIndex + 1) + ' Question ' + question.id + ' has ' + (question.options ? question.options.length : 0) + ' options instead of 4');
            }
          });
        }
      });
    }
    
    if (listeningData.part3 && listeningData.part3.talks) {
      listeningData.part3.talks.forEach(function(talk, talkIndex) {
        if (talk.questions) {
          talk.questions.forEach(function(question) {
            if (!question.options || question.options.length !== 4) {
              errors.push('Listening Part 3 Talk ' + (talkIndex + 1) + ' Question ' + question.id + ' has ' + (question.options ? question.options.length : 0) + ' options instead of 4');
            }
          });
        }
      });
    }
    
    return { errors: errors, warnings: warnings };
  },
  
  // Validate for garbage data in questions
  validateGarbageData: function(sectionData, sectionName) {
    var errors = [];
    var warnings = [];
    
    if (sectionData.passages) {
      sectionData.passages.forEach(function(passage, passageIndex) {
        if (passage.questions) {
          passage.questions.forEach(function(question) {
            // Check for numeric garbage in question text
            if ((String(question.question || '').match(/\d{4,}/g) || []).some(function(value) { var n = Number(value); return value.length >= 5 || (value.length === 4 && (n < 1800 || n > 2099)); })) {
              warnings.push(sectionName + ' Passage ' + (passageIndex + 1) + ' Question ' + question.id + ' may contain suspicious numeric data: ' + question.question);
            }
          });
        }
      });
    }
    
    return { errors: errors, warnings: warnings };
  },
  
  // Validate for garbage data in listening
  validateListeningGarbageData: function(listeningData) {
    var errors = [];
    var warnings = [];
    
    if (listeningData.part1 && listeningData.part1.questions) {
      listeningData.part1.questions.forEach(function(question) {
        if ((String(question.question || '').match(/\d{4,}/g) || []).some(function(value) { var n = Number(value); return value.length >= 5 || (value.length === 4 && (n < 1800 || n > 2099)); })) {
          warnings.push('Listening Part 1 Question ' + question.id + ' may contain suspicious numeric data: ' + question.question);
        }
      });
    }
    
    if (listeningData.part2 && listeningData.part2.conversations) {
      listeningData.part2.conversations.forEach(function(conv, convIndex) {
        if (conv.questions) {
          conv.questions.forEach(function(question) {
            if ((String(question.question || '').match(/\d{4,}/g) || []).some(function(value) { var n = Number(value); return value.length >= 5 || (value.length === 4 && (n < 1800 || n > 2099)); })) {
              warnings.push('Listening Part 2 Conversation ' + (convIndex + 1) + ' Question ' + question.id + ' may contain suspicious numeric data: ' + question.question);
            }
          });
        }
      });
    }
    
    if (listeningData.part3 && listeningData.part3.talks) {
      listeningData.part3.talks.forEach(function(talk, talkIndex) {
        if (talk.questions) {
          talk.questions.forEach(function(question) {
            if ((String(question.question || '').match(/\d{4,}/g) || []).some(function(value) { var n = Number(value); return value.length >= 5 || (value.length === 4 && (n < 1800 || n > 2099)); })) {
              warnings.push('Listening Part 3 Talk ' + (talkIndex + 1) + ' Question ' + question.id + ' may contain suspicious numeric data: ' + question.question);
            }
          });
        }
      });
    }
    
    return { errors: errors, warnings: warnings };
  }
};
