import LoggerService from './LoggerService';
var NodeTrello = require("node-trello");
var t = new NodeTrello(process.env.TRELLO_API_KEY, process.env.TRELLO_API_TOKEN);
const Trello = {};

Trello.fetchBoards = callback => t.get("/1/members/me/boards", function(err, boards) {
  if (err) {
    LoggerService.push(`error loading boards: ${err.message}`);
  } else {
    LoggerService.push('boards loaded');
    callback(boards);
  }
});

Trello.fetchLists = (board, callback) => t.get(`/1/boards/${board.id}/lists`, function(err, lists) {
  if (err) {
    LoggerService.push(`error loading lists: ${err.message}`);
  } else {
    LoggerService.push('lists loaded');
    callback(lists);
  }});

Trello.fetchCards = (list, callback) => t.get(`/1/lists/${list.id}/cards`, function(err, cards) {
  if (err) {
    LoggerService.push(`error loading cards: ${err.message}`);
  } else {
    LoggerService.push('cards loaded');
    callback(cards);
  }
});

Trello.fetchMe = callback => t.get("/1/members/me", function(err, me) {
  if (err) {
    LoggerService.push(`error loading me: ${err.message}`);
  } else {
    LoggerService.push('personal info loaded');
    callback(me);
  }
});

Trello.assignToMyself = (card, me) => {
  card.idMembers.push(me.id);
  t.put(`/1/cards/${card.id}/idMembers?value=${card.idMembers}`, function(err, data) {
    if (err) {
      LoggerService.push(`error assigning card: ${err.message}`);
    } else {
      LoggerService.push(`Card ${card.id} assigned to myself`);
    }
    return data;
  });
};

Trello.moveToNextColumn = (card, lists) => {
  const newListId = lists[lists.findIndex(list => list.id === card.idList) + 1].id;
  t.put(`/1/cards/${card.id}/idList?value=${newListId}`, function(err, data) {
    if (err) {
      LoggerService.push(`error moving card to next column ${err.message}`);
    } else {
      LoggerService.push(`Card ${card.id} moved to next column`);
    }
    return data;
  });
};

Trello.postComment = (card, message) => {
  t.post(`/1/cards/${card.id}/actions/comments?text=${message}`, function(err, data) {
    if (err) {
      LoggerService.push(`error posting comment: ${err.message}`);
    } else {
      LoggerService.push(`Commented ${card.id} successfully`);
    }
  })
}

export default Trello;
