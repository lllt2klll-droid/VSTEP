const fs = require('fs');
const path = require('path');

// Read the practiceTests.js file
const filePath = path.join(__dirname, 'src', 'data', 'practiceTests.js');
let content = fs.readFileSync(filePath, 'utf8');

// Manually extract answerKey arrays for each test and update question.answer fields
const tests = ['test_1_complete', 'test_2_complete', 'test_3_complete', 'test_4_complete', 'test_5_complete', 'test_6_complete', 'test_7_complete'];

for (const testId of tests) {
  console.log(`Processing ${testId}...`);

  // Find the test section
  const testStartRegex = new RegExp(`id: "${testId}"`, 'g');
  const testStartMatch = testStartRegex.exec(content);
  if (!testStartMatch) {
    console.log(`Could not find ${testId}`);
    continue;
  }

  const testStartIndex = testStartMatch.index;

  // Find the answerKey section for this test
  const answerKeyRegex = /answerKey:\s*\{[\s\S]*?listening:\s*\[([\s\S]*?)\][\s\S]*?reading:\s*\[([\s\S]*?)\][\s\S]*?\}/g;
  let answerKeyMatch;
  let testAnswerKey = null;

  // Reset regex lastIndex
  answerKeyRegex.lastIndex = testStartIndex;

  while ((answerKeyMatch = answerKeyRegex.exec(content)) !== null) {
    // Check if this answerKey is within the current test (before the next test starts)
    const nextTestRegex = /id: "test_\d+_complete"/g;
    nextTestRegex.lastIndex = answerKeyMatch.index;
    const nextTestMatch = nextTestRegex.exec(content);

    if (!nextTestMatch || answerKeyMatch.index < nextTestMatch.index) {
      testAnswerKey = answerKeyMatch;
      break;
    }
  }

  if (!testAnswerKey) {
    console.log(`Could not find answerKey for ${testId}`);
    continue;
  }

  // Parse the answerKey arrays
  const parseArray = (str) => {
    return str.split(',').map(s => s.trim().replace(/"/g, ''));
  };

  const listeningAnswers = parseArray(testAnswerKey[1]);
  const readingAnswers = parseArray(testAnswerKey[2]);

  console.log(`  Listening answers: ${listeningAnswers.length}`);
  console.log(`  Reading answers: ${readingAnswers.length}`);

  // Find the reading section for this test
  const readingSectionRegex = new RegExp(`id: "${testId}"[\\s\\S]*?reading:\\s*\\{`, 'g');
  readingSectionRegex.lastIndex = testStartIndex;
  const readingSectionMatch = readingSectionRegex.exec(content);

  if (!readingSectionMatch) {
    console.log(`Could not find reading section for ${testId}`);
    continue;
  }

  const readingSectionStart = readingSectionMatch.index + readingSectionMatch[0].length - 'reading: {'.length;

  // Find the end of the reading section (listening section or answerKey)
  const listeningSectionRegex = /listening:\s*\{/g;
  listeningSectionRegex.lastIndex = readingSectionStart;
  const listeningSectionMatch = listeningSectionRegex.exec(content);

  const answerKeySectionRegex = /answerKey:\s*\{/g;
  answerKeySectionRegex.lastIndex = readingSectionStart;
  const answerKeySectionMatch = answerKeySectionRegex.exec(content);

  let readingSectionEnd;
  if (listeningSectionMatch && (!answerKeySectionMatch || listeningSectionMatch.index < answerKeySectionMatch.index)) {
    readingSectionEnd = listeningSectionMatch.index;
  } else if (answerKeySectionMatch) {
    readingSectionEnd = answerKeySectionMatch.index;
  } else {
    console.log(`Could not find end of reading section for ${testId}`);
    continue;
  }

  const readingSection = content.substring(readingSectionStart, readingSectionEnd);

  // Update reading questions within the reading section
  let updatedReadingSection = readingSection;
  for (let i = 0; i < readingAnswers.length; i++) {
    const questionId = i + 1;
    const correctAnswer = readingAnswers[i];

    // Find and replace the answer for this specific question
    const questionRegex = new RegExp(`(\\{\\s*id:\\s*${questionId},[^}]*?answer:\\s*)"[A-D]"`, 'g');
    updatedReadingSection = updatedReadingSection.replace(questionRegex, `$1"${correctAnswer}"`);
  }

  // Replace the reading section in the content
  content = content.substring(0, readingSectionStart) + updatedReadingSection + content.substring(readingSectionEnd);

  // Find the listening section for this test
  const newListeningSectionRegex = /listening:\s*\{/g;
  newListeningSectionRegex.lastIndex = testStartIndex;
  const newListeningSectionMatch = newListeningSectionRegex.exec(content);

  if (!newListeningSectionMatch) {
    console.log(`Could not find listening section for ${testId}`);
    continue;
  }

  const listeningSectionStart = newListeningSectionMatch.index;

  // Find the end of the listening section (answerKey or writing)
  const writingSectionRegex = /writing:\s*\{/g;
  writingSectionRegex.lastIndex = listeningSectionStart;
  const writingSectionMatch = writingSectionRegex.exec(content);

  const newAnswerKeySectionRegex = /answerKey:\s*\{/g;
  newAnswerKeySectionRegex.lastIndex = listeningSectionStart;
  const newAnswerKeySectionMatch = newAnswerKeySectionRegex.exec(content);

  let listeningSectionEnd;
  if (writingSectionMatch && (!newAnswerKeySectionMatch || writingSectionMatch.index < newAnswerKeySectionMatch.index)) {
    listeningSectionEnd = writingSectionMatch.index;
  } else if (newAnswerKeySectionMatch) {
    listeningSectionEnd = newAnswerKeySectionMatch.index;
  } else {
    console.log(`Could not find end of listening section for ${testId}`);
    continue;
  }

  const listeningSection = content.substring(listeningSectionStart, listeningSectionEnd);

  // Update listening questions within the listening section
  let updatedListeningSection = listeningSection;
  for (let i = 0; i < listeningAnswers.length; i++) {
    const questionId = i + 1;
    const correctAnswer = listeningAnswers[i];

    // Find and replace the answer for this specific question
    const questionRegex = new RegExp(`(\\{\\s*id:\\s*${questionId},[^}]*?answer:\\s*)"[A-D]"`, 'g');
    updatedListeningSection = updatedListeningSection.replace(questionRegex, `$1"${correctAnswer}"`);
  }

  // Replace the listening section in the content
  content = content.substring(0, listeningSectionStart) + updatedListeningSection + content.substring(listeningSectionEnd);

  console.log(`  Updated ${testId}`);
}

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Done!');
