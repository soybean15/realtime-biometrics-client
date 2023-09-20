export default class WebSocketService {
    constructor(channelName) {
      this.channel = channelName;
      this.echo = window.echo.channel(this.channel);
    }
  
    listen(eventName, callback) {
      this.echo.listen(eventName, (response) => {
        callback(response);
      });
    }
}
