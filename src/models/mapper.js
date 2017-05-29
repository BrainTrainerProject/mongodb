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

exports.convertNotecardTypeToJsonResponse = function (notecardtype) {
  return {
    name: notecardtype.name,
  };
};

exports.convertProfileToJsonResponse = function (profile) {
  return {
    email: profile.email,
    oauthtoken: profile.oauthtoken,
    photourl: profile.photourl,
    follower: profile.follower,
    visibility: profile.visibility,
    sets: profile.sets,
  };
};

exports.convertSetToJsonResponse = function (set) {
  return {
    notecard: set.notecard,
    tags: set.tags,
    valuations: set.valuations,
    owner: set.owner,
    lastchange: set.lastchange,
    visibility: set.visibility,
    photourl: set.photourl,
  };
};

exports.convertStatisticToJsonResponse = function (statistic) {
  return {
    profile: statistic.profile,
    notecard: statistic.notecard,
    successfultries: statistic.successfultries,
    totaltries: statistic.totaltries,
  };
};

exports.convertValuationToJsonResponse = function (valuation) {
  return {
    score: valuation.score,
    comment: valuation.comment,
    profile: valuation.profile,
    createdAt: valuation.createdAt,
  };
};
