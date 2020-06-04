from flask import jsonify
from peewee import *
from VENDAS import Produto, Usuario
from datetime import date, datetime
import os

export_folder = 'exports'


def produto_busca(data):
    try:
        result = ''
        print(data)
        if data['ativo'] == 'T':
            if data['tipo'] == 0 or data['tipo'] == '0':
                result = Produto.select().where(
                    Produto.descri.contains(data['valor'])
                ).order_by(Produto.descri)
            elif data['tipo'] == 1 or data['tipo'] == '1':
                result = Produto.select().where(
                    Produto.codigo == data['valor']
                ).order_by(Produto.descri)
            else:
                result = Produto.select().order_by(Produto.descri)
        else:
            if data['tipo'] == 0 or data['tipo'] == '0':
                result = Produto.select().where(
                    (Produto.descri.contains(data['valor'])) &
                    (Produto.ativo == data['ativo'])
                ).order_by(Produto.descri)
            elif data['tipo'] == 1 or data['tipo'] == '1':
                result = Produto.select().where(
                    (Produto.codigo == data['valor']) &
                    (Produto.ativo == data['ativo'])
                ).order_by(Produto.descri)
            else:
                result = Produto.select().where(Produto.ativo == data['ativo']).order_by(Produto.descri)
        produtos = []
        for r in result:
            tmp = {
                'codigo': r.codigo,
                'descri': r.descri,
                'preco': '{:.2f}'.format(r.preco),
                'quant': r.quant,
                'ativo': r.ativo
            }
            produtos.append(tmp)
        res = {'status': 200, 'data': produtos}
    except Exception as e:
        print(e)
        res = {
            'status': 500,
            'message': str(e)
        }
    return jsonify(res)


def produto_all():
    pass


def produto_alt(data):
    try:
        data['preco'] = float(str(data['preco']).replace(',', '.'))

        tmp = Produto(**data)
        r = tmp.save()
        res = {
            'status': 200,
            'message': 'Alteração realizada com sucesso!'
        }
    except Exception as err:
        print(err)
        res = {'status': 500, 'message': 'Erro: ' + str(err)}
    return res


def produto_del(codigo):
    try:
        q = Produto.delete().where(Produto.codigo == codigo)
        q.execute()
        res = {
            'status': 200,
            'message': 'Produto excluído com sucesso!'
        }
    except Exception as err:
        print(err)
        res = {'status': 500, 'message': 'Erro: ' + str(err)}
    return res


def produto_cad(data):
    try:
        r = Produto.create(**data)
        res = {
            'status': 200,
            'message': 'Cadastro realizado com sucesso!'
        }
    except Exception as e:
        print(str(e))
        res = {'status': 500, 'message': 'Erro: '+str(e)}

    return jsonify(res)


def swu(data):
    import hashlib
    try:
        res = Usuario.get(
            Usuario.usuario == data['usuario'],
            Usuario.senha == hashlib.md5(data['senha'].encode('utf-8')).hexdigest(),
            Usuario.ativo == 'S'
        )
        data = {
            'codigo': res.codigo,
            'nome': res.nome.strip(),
            'usuario': res.usuario.strip()
        }
    except Exception as e:
        print(e)
        data = {'codigo': -1}

    return jsonify(data)
