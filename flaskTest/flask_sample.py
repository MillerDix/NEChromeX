# -*- coding: utf-8 -*-

from netease_api import Netease
from flask import Flask
from flask import jsonify
api = Netease()

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'pai ni ma de xu'

@app.route('/test', methods=['POST'])
def test():
    return 'test'

@app.route('/hot_list', methods=['POST'])
def hot_list():
    response = api.top_songlist(1)
    return jsonify(response)

@app.route('/mylist', methods=['POST'])
def mylist():
    response = api.user_playlist(9586316)
    return jsonify(response)

@app.route('/playlist/<playlist_id>', methods=['POST'])
def playlist(playlist_id):
    # print(playlist_id)
    response = api.playlist_detail(playlist_id)
    # print(response)
    return jsonify(response)

if __name__ == '__main__':
    app.run()
