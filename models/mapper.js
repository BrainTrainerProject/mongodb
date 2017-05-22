exports.convertNotecardToJsonResponse = function (notecard) {
  return {
    id: notecard.id,
    title: notecard.title,
    task: notecard.task,
    answer: notecard.answer
  }
};
