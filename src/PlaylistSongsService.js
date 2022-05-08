const { Pool } = require('pg');
 
class PlaylistSongsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistSongs(userId, playlistId) {
        const playlist = await this.getPlaylistsById(playlistId);
        const songs = await this.getSongsByPlaylistId(playlistId);
        playlist.songs = songs;
        return playlist;  
    }

    async getPlaylistsById(id) {
        const result = await this._pool.query({
            text: `SELECT playlists.id, playlists.name, users.username FROM playlists 
                    LEFT JOIN users ON users.id = playlists.owner 
                    WHERE playlists.id = $1`,
            values: [id],
        });
        return result.rows[0];
    }

    async getSongsByPlaylistId(playlistId) {
        const result = await this._pool.query({
            text: `SELECT songs.id, songs.title, songs.performer FROM songs 
                    LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id 
                    WHERE playlist_songs.playlist_id = $1`,
            values: [playlistId],
        });
        return result.rows;
    }
}

module.exports = PlaylistSongsService;
