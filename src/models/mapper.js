exports.convertNotecardToJsonResponse = function (notecard) {
  return {
    id: notecard.id,
    title: notecard.title,
    task: notecard.task,
    answer: notecard.answer,
    owner: notecard.owner,
    lastchange: notecard.lastchange,
    type: notecard.type,
  };
};
