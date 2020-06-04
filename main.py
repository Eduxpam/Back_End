# coding: utf-8
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import lib
import socket
import os

app = Flask(__name__)
cors = CORS(app)
export_folder = 'exports'
# http://192.168.0.21:5000/vendas/login/


@app.route('/vendas/login/', methods=['POST'])
def swu():
    return lib.swu(request.get_json())


@app.route('/vendas/produto/', methods=['POST'])
def produto_cad():
    return lib.produto_cad(request.get_json())


@app.route('/vendas/produto/busca/', methods=['POST'])
def produto_busca():
    return lib.produto_busca(request.get_json())


@app.route('/vendas/produto/', methods=['PUT'])
def produto_alt():
    return lib.produto_alt(request.get_json())


@app.route('/vendas/produto/', methods=['GET'])
def produto_all():
    return lib.produto_all()


@app.route('/vendas/produto/<string:codigo>', methods=['DELETE'])
def produto_del(codigo):
    return lib.produto_del(codigo)


if __name__ == '__main__':
    app.run(host=socket.gethostbyname(socket.gethostname()), port=5000, debug=False)
