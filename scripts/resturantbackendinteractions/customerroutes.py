
"""this module will generate a mini webserver"""
import re,random,os
from functools import wraps
import sqlite3
from flask import Flask,render_template,request,redirect,flash,make_response,session
from sqlalchemy.sql import text
from resturantbackendinteractions import app
from resturantbackendinteractions import csrf
from resturantbackendinteractions.models import db,User,Cart,Orders,Amountearned
from flask import jsonify,json
from werkzeug.utils import secure_filename
import string


@app.route('/api/onconnect',methods=["POST"])
def onconnect():
    # data = request.json
    try:
        data = request.get_json()
        user_address = data.get('user_address')
        deets=db.session.query(User).filter(User.user_address==user_address).first()
        if deets:
            return jsonify("already exists")
        else :
            addonconnect=User(user_address=user_address)
            db.session.add(addonconnect)
            db.session.commit()
            response = {'message': 'Data received successfully'}
            return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500




@app.route('/api/addtocart', methods=['POST'])
def addtocart():
        data = request.form
        cart_owner = data.get('cart_owner')
        item_quantity = data.get('item_quantity')
        item_price = data.get('item_price')
        cart_item = data.get('cart_item')
        addtocartt = Cart(cart_owner=cart_owner,cart_item_quantity=item_quantity,cart_item_price=item_price,cart_item=cart_item)
        db.session.add(addtocartt)
        db.session.commit()
        return "success"


@app.route('/api/cartdetails/<id>', methods=['GET'])
def cartdetails(id):
    cartget = User.query.get_or_404(id)
    cart_list = [{'quantity': Cart.cart_item_quantity, 'item': Cart.cart_item, 'price':Cart.cart_item_price} for Cart in cartget.cartuser]
    return jsonify(cart_list)

@app.route('/api/cartdetailsjusttwo/<id>', methods=['GET'])
def cartdetailsjusttwo(id):
    cartget = User.query.get_or_404(id)
    cart_list = [{'quantity': Cart.cart_item_quantity, 'item': Cart.cart_item} for Cart in cartget.cartuser]
    return jsonify(cart_list)


@app.route('/api/orderdetails/<id>', methods=['GET'])
def orderdetails(id):
    orderget = User.query.get_or_404(id)
    order_list = [{'Order_id': Orders.order_idnumber, 'Orderstatus':Orders.order_status, 'Orderitem':Orders.item_ordered ,'OrderNo':Orders.order_id } for Orders in orderget.orderbyuser]
    return jsonify(order_list)


@app.route('/api/placeorder', methods=['POST','DELETE'])
def placeorder():
        try:
              data = request.get_json()
              order_list = json.loads(data.get('millo'))
              orderedbyname = data.get('ordered_byfullname')
              phonenum = data.get('order_phonenumber')
              homeaddress = data.get('order_homeaddress')
              orderamount = data.get('order_amount')
              status = data.get('order_status')
              walletaddress = data.get('ordered_byaddress')

              result_string = ""
              for order in order_list:
                     result_string += f"{order['quantity']} {order['item']}\n,"

              idnumber = ''.join(random.choices(string.ascii_letters + string.digits, k=10))


              addtoorders = Orders(item_ordered=result_string,ordered_byfullname=orderedbyname,order_amount=orderamount,order_phonenumber=phonenum,ordered_byaddress=walletaddress,order_status=status,order_homeaddress=homeaddress,order_idnumber=idnumber)
              addamount = Amountearned(amounts_earned=orderamount)
              db.session.add(addtoorders)
              db.session.add(addamount)
              Cart.query.filter_by(cart_owner=walletaddress).delete()
              db.session.commit()



              return ("success")
        except Exception as e:
             return jsonify({'error': str(e)}), 500
        

@app.route('/api/userprofile/<id>',methods=["GET"])
def userprofile(id):
    userdeets=db.session.query(User).get(id)
    if userdeets:
        user_details = {
            'fullname': userdeets.user_fullname,
            'homeaddress': userdeets.user_homeaddress,
            'phonenumber':userdeets.user_phn
        }

        return jsonify(user_details)
    


@app.route('/api/userprofiledetails/<id>',methods=["GET"])
def userprofiledetails(id):
    userdeets=db.session.query(User).get(id)
    if userdeets:
        user_details = {
            'homeaddress': userdeets.user_homeaddress,
            'phonenumber':userdeets.user_phn,
            'fullname': userdeets.user_fullname,
            'email':userdeets.user_email,
        }

        return jsonify(user_details)
    

@app.route('/api/orderdetails/delete/<order_id>', methods=['DELETE'])
def delete_order(order_id):
    try:
        d= Orders.query.get(order_id)
        db.session.delete(d)
        db.session.commit()
        
        return jsonify({"success": True, "message": f"Order with ID {order_id} deleted successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": f"Error deleting order: {str(e)}"})
    


@app.route('/api/updateprofilename', methods=["POST"])
def updateprofilename():
    data = request.form
    user_fullname = data.get('user_fullname')
    user_address = data.get('user_address')
    updatep = db.session.query(User).get(user_address)
    updatep.user_fullname=user_fullname
    db.session.commit()
    return "success normal"

@app.route('/api/updateprofileemail', methods=["POST"])
def updateprofileemail():
    data = request.form
    user_address = data.get('user_address')
    user_email = data.get('user_email')
    updatep = db.session.query(User).get(user_address)
    updatep.user_email=user_email
    db.session.commit()
    return "success normal"

@app.route('/api/updateprofilephone', methods=["POST"])
def updateprofilephone():
    data = request.form
    user_address = data.get('user_address')
    user_phn= data.get('user_phn')
    updatep = db.session.query(User).get(user_address)
    updatep.user_phn=user_phn
    db.session.commit()
    return "success normal"

@app.route('/api/updateprofilehomeaddress', methods=["POST"])
def updateprofilehomeaddress():
    data = request.form
    user_address = data.get('user_address')
    user_homeaddress = data.get('user_homeaddress')
    updatep = db.session.query(User).get(user_address)
    updatep.user_homeaddress=user_homeaddress
    db.session.commit()
    return "success normal"