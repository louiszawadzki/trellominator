var NodeTrello = require("node-trello");
var t = new NodeTrello(process.env.TRELLO_API_KEY, process.env.TRELLO_API_TOKEN);
const Trello = {
  boards: [],
};

Trello.fetchBoards = callback => t.get("/1/members/me/boards", function(err, boards) {
  if (err) throw err;
  callback(boards);
});

export default Trello;
