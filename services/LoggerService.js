const LoggerService = (function () {
  return {
    logs: [],
    callback: () => {},
    push: function(log) {
      const now = new Date();
      this.logs.push(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${log}`);
      this.callback(this.logs);
    },
    setCallback: function(callback) {
      this.callback = callback;
    },
  }
})();

export default LoggerService;
