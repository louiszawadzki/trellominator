const LoggerService = (function () {
  return {
    logs: [],
    callback: () => {},
    push: function(log) {
      const now = new Date();
      this.logs.unshift(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${log}`);
      if (this.logs.length > 8) {
        this.logs.pop();
      }
      this.callback(this.logs);
    },
    setCallback: function(callback) {
      this.callback = callback;
    },
  }
})();

export default LoggerService;
