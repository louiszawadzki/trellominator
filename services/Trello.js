import LoggerService from './LoggerService';
var NodeTrello = require("node-trello");
var t = new NodeTrello(process.env.TRELLO_API_KEY, process.env.TRELLO_API_TOKEN);
const Trello = {};

const API = {
  get: (url, callback, dataType) => {
    LoggerService.push(`Loading ${dataType}`);
    t.get(url, function(err, data) {
      if (err) {
        LoggerService.push(`Error loading ${dataType}: ${err.message}`);
      } else {
        LoggerService.push(`Successfully loaded ${dataType}`);
        callback(data);
      }
    });
  },
  put: (url, requestMessage, successMessage, errorMessage) => {
    LoggerService.push(requestMessage);
    t.put(url, function(err, data) {
      if (err) {
        LoggerService.push(`${errorMessage}: ${err.message}`);
      } else {
        LoggerService.push(successMessage);
      }
      return data;
    });
  },
  post: (url, requestMessage, successMessage, errorMessage) => {
    LoggerService.push(requestMessage);
    t.post(url, function(err, data) {
      if (err) {
        LoggerService.push(`${errorMessage}: ${err.message}`);
      } else {
        LoggerService.push(successMessage);
      }
      return data;
    });
  },
}

Trello.fetchBoards = callback => API.get(
  '/1/members/me/boards',
  callback,
  'boards',
);

Trello.fetchLists = (board, callback) => API.get(
  `/1/boards/${board.id}/lists`,
  callback,
  'lists',
);

Trello.fetchCards = (list, callback) => API.get(
  `/1/lists/${list.id}/cards`,
  callback,
  'cards',
);

Trello.fetchMe = callback => API.get(
  '/1/members/me',
  callback,
  'personal info',
);

Trello.assignToMyself = (card, me) => {
  card.idMembers.push(me.id);
  API.put(
    `/1/cards/${card.id}/idMembers?value=${card.idMembers}`,
    `Assigning card ${card.id} to myself`,
    'Error assigning card',
    `Card ${card.id} assigned to myself`,
  );
};

Trello.moveToNextColumn = (card, lists) => {
  const newListId = lists[lists.findIndex(list => list.id === card.idList) + 1].id;
  API.put(
    `/1/cards/${card.id}/idList?value=${newListId}`,
    `Moving card ${card.id} to next Column`,
    'Error assigning card',
    `Card ${card.id} assigned to myself`,
  );
};

Trello.postComment = (card, message) => {
  API.post(
    `/1/cards/${card.id}/actions/comments?text=${message}`,
    'Posting Comment',
    'Error posting comment',
    `Commented ${card.id} successfully`,
  );
}

export default Trello;
