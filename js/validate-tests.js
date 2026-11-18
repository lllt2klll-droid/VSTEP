/* ==========================================================================
   PRACTICE TEST DATA VALIDATION
   Runs once the page has finished loading and prints a report for every
   practice test (missing options, wrong answer keys, duplicate ids ...) to
   the developer console. See src/utils/PracticeTestValidator.js.
   ========================================================================== */
window.addEventListener("load", function () {
  "use strict";

  if (!window.practiceTests || !window.PracticeTestValidator) return;

  var results = PracticeTestValidator.validateAll(practiceTests);
  PracticeTestValidator.printResults(results);
});
