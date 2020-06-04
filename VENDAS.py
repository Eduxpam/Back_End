from peewee import *

# database = PostgresqlDatabase('VENDAS', **{'user': 'postgres', 'password': '3rv1lh4'})
database = PostgresqlDatabase('VENDAS', **{'user': 'postgres', 'password': 'postgres'})

class UnknownField(object):
    def __init__(self, *_, **__): pass

class BaseModel(Model):
    class Meta:
        database = database

class Produto(BaseModel):
    ativo = CharField(constraints=[SQL("DEFAULT 'S'::character varying")])
    codigo = CharField(primary_key=True)
    descri = CharField()
    img = CharField(null=True)
    preco = DoubleField()
    quant = IntegerField()

    class Meta:
        table_name = 'produto'

class Usuario(BaseModel):
    ativo = CharField(constraints=[SQL("DEFAULT 'S'::character varying")])
    codigo = AutoField()
    nome = CharField()
    senha = CharField()
    usuario = CharField()

    class Meta:
        table_name = 'usuario'

