var NodeTrello = require("node-trello");
var t = new NodeTrello(process.env.TRELLO_API_KEY, process.env.TRELLO_API_TOKEN);
const Trello = {};

Trello.fetchBoards = callback => t.get("/1/members/me/boards", function(err, boards) {
  if (err) throw err;
  callback(boards);
});

Trello.fetchLists = (board, callback) => t.get(`/1/boards/${board.id}/lists`, function(err, lists) {
  if (err) throw err;
  callback(lists);
});

Trello.fetchCards = (list, callback) => t.get(`/1/lists/${list.id}/cards`, function(err, cards) {
  if (err) throw err;
  callback(cards);
});

Trello.moveToNextColumn = (card, lists) => {
  const newListId = lists[lists.findIndex(list => list.id === card.idList) + 1].id;
  t.put(`/1/cards/${card.id}/idList?value=${newListId}`, function(err, data) {
    console.log(err);
    if (err) throw err;
    console.log(data);
    return data;
  });
};

export default Trello;
