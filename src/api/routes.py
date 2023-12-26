"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.username for user in users])
    elif request.method == 'POST':
        data = request.json
        user = User(username=data['username'], email=data['email'], 
                        active=data['active'], password=generate_password_hash(data['password']))
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'Usuario creado exitosamente'}), 201

@api.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.username for user in users])
    elif request.method == 'POST':
        data = request.json
        print(data)
        email = data.get('email')
        password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    token = create_access_token(identity={'email': user.email})
    return jsonify({'token': token, 'user_id': user.id, 'message': 'Login successful'}), 200
