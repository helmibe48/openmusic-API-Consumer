class Listener {
    constructor(playlistSongsService, mailSender) {
      this._playlistSongsService = playlistSongsService;
      this._mailSender = mailSender;

      this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { userId, targetEmail, playlistId } = JSON.parse(message.content.toString());
            const playlistSongs = await this._playlistSongsService.getPlaylistSongs(userId, playlistId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistSongs));
            console.log(result);
        } catch (error) {
          console.error(error);
        }
    }
}

module.exports = Listener;
