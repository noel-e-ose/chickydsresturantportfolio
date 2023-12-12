from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    user_address= db.Column(db.String(200),nullable=True,primary_key=True)
    user_fullname = db.Column(db.String(100),nullable=True)
    user_email = db.Column(db.String(120),nullable=True)
    user_homeaddress= db.Column(db.String(120),nullable=True)
    user_phn= db.Column(db.String(120),nullable=True)

    cartuser = db.relationship('Cart',backref='cart_user')
    orderbyuser = db.relationship('Orders',backref='user_orders')

class Orders(db.Model):
    order_id= db.Column(db.Integer, autoincrement=True,primary_key=True)
    ordered_byfullname= db.Column(db.String(120),nullable=True)
    item_ordered= db.Column(db.String(500),nullable=True)
    order_amount = db.Column(db.String(120), nullable=True)
    order_status= db.Column(db.String(120),nullable=True)
    order_idnumber= db.Column(db.String(120),nullable=True)
    order_homeaddress= db.Column(db.String(120),nullable=True)
    order_phonenumber= db.Column(db.String(120),nullable=True)
    ordered_byaddress = db.Column(db.String(200),db.ForeignKey("user.user_address"),nullable=True)

class Amountearned(db.Model):
    earning_id= db.Column(db.Integer, autoincrement=True,primary_key=True)
    amounts_earned= db.Column(db.String(120),nullable=True)
    earning_date= db.Column(db.DateTime(), default=datetime.utcnow)


class Cart(db.Model):
    cart_id= db.Column(db.Integer, autoincrement=True,primary_key=True)
    cart_item= db.Column(db.String(120),nullable=True)
    cart_item_quantity= db.Column(db.String(120),nullable=True)
    cart_item_price= db.Column(db.String(120),nullable=True)
    cart_owner= db.Column(db.String(200),db.ForeignKey("user.user_address"),nullable=True)