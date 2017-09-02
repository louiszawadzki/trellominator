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

export default Trello;
