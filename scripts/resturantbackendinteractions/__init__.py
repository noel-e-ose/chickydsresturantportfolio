#order of importation 
#python #3rd party packages #local imports
from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_migrate import Migrate
csrf = CSRFProtect()
import os

def create_app():
    app=Flask(__name__)
    from resturantbackendinteractions import config
    app.config.from_pyfile('config.py',silent=True)
    from resturantbackendinteractions.models import db
    db.init_app(app)
    migrate= Migrate(app,db)
    return app

app = create_app()

# from flask_sqlalchemy import SQLAlchemy

# app=Flask(__name__)
# from fapp import config
# app.config.from_pyfile('config.py',silent=False)

# db = SQLAlchemy(app)

from resturantbackendinteractions import customerroutes,adminroutes,models