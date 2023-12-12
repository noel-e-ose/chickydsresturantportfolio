
"""this module will generate a mini webserver"""
import re,random,os
from functools import wraps
from flask import Flask,render_template,request,redirect,flash,make_response,session,url_for
from sqlalchemy.sql import text
from resturantbackendinteractions import app
from resturantbackendinteractions import csrf
from resturantbackendinteractions.models import db,User,Orders,Amountearned
from flask import jsonify,json
from werkzeug.utils import secure_filename


@app.route('/adminaccess/api/getallusers', methods=['GET'])
def admingetallusers():
      allusers = db.session.query(User).all()
      return jsonify ([{'id': user.user_address, 'name': user.user_fullname, 'email': user.user_email, 'phone':user.user_phn }for user in allusers ])

@app.route('/adminaccess/api/getamountsearned', methods=['GET'])
def admingetamountsearned():
      allamount = db.session.query(Amountearned).all()
      return jsonify ([{'amount': amountearned.amounts_earned}for amountearned in allamount ])

@app.route('/adminaccess/api/getallorders', methods=['GET'])
def admingetallorders():
      allorders = db.session.query(Orders).all()
      return jsonify ([{'id': order.order_id, 'orderedby': order.ordered_byfullname, 'itemordered': order.item_ordered, 'orderamount': order.order_amount, 'orderstatus': order.order_status, 'orderwalletaddress': order.ordered_byaddress, 'userhomeaddress': order.order_homeaddress }for order in allorders ])

@app.route('/adminaccess/api/updateorderstatus/<order_id>', methods=["POST"])
def updateorderstatus(order_id):
    data = request.form
    order_statusxx = data.get('order_status')
    updatep = db.session.query(Orders).get(order_id)
    updatep.order_status=order_statusxx
    db.session.commit()
    return "success normal on p"
