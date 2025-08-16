from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from datetime import timedelta
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)

# 🔐 JWT Config
app.config['JWT_SECRET_KEY'] = 'secret-key-for-jwt'  # Keep this safe!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

# 💾 SQLite DB Config – ✅ Use absolute path to avoid accidental db overwrites
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'foodbridge.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 📦 Models
class FoodItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    expiry = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# ✅ REGISTER Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registration successful"}), 201

# ✅ LOGIN Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity={"id": user.id, "email": user.email, "username": user.username})
    return jsonify({
        "message": "Login successful!",
        "access_token": access_token
    }), 200

# ✅ RESET PASSWORD Route (no email or token, just username + new password)
@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and new password required"}), 400
    if len(password) < 6:
        return jsonify({"message": "Password must be at least 6 characters"}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Update password (always hash the password!)
    user.password = bcrypt.generate_password_hash(password).decode('utf-8')
    db.session.commit()

    return jsonify({"message": "Password updated successfully!"}), 200

# ✅ GET /profile – Return current user's profile
@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user['id']).first()

    if not user:
        return jsonify({'error': 'User not found'}), 404

    donation_count = FoodItem.query.filter_by(user_id=user.id).count()

    # Badge Logic
    if donation_count >= 10:
        badge = "Gold Donor 🥇"
    elif donation_count >= 5:
        badge = "Silver Donor 🪙"
    elif donation_count >= 1:
        badge = "Bronze Donor 🟫"
    else:
        badge = "New Donor"

    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'donation_count': donation_count,
        'badge': badge
    })

# ✅ GET /food – List all food items
@app.route('/food', methods=['GET'])
def get_food():
    food_list = FoodItem.query.all()
    result = [{
        'id': item.id,
        'name': item.name,
        'quantity': item.quantity,
        'location': item.location,
        'expiry': item.expiry
    } for item in food_list]
    return jsonify(result)

# ✅ POST /food – Add new food item (requires login)
@app.route('/food', methods=['POST'])
@jwt_required()
def add_food():
    data = request.get_json()
    current_user = get_jwt_identity()

    new_food = FoodItem(
        name=data.get('name'),
        quantity=data.get('quantity'),
        location=data.get('location'),
        expiry=data.get('expiry'),
        user_id=current_user['id']
    )
    db.session.add(new_food)
    db.session.commit()

    return jsonify({
        'message': f'Food item added by user {current_user["id"]}',
        'data': {
            'id': new_food.id,
            'name': new_food.name,
            'quantity': new_food.quantity,
            'location': new_food.location,
            'expiry': new_food.expiry
        }
    }), 201

# ✅ GET /my-donations – Get food items added by the current user
@app.route('/my-donations', methods=['GET'])
@jwt_required()
def get_user_donations():
    current_user = get_jwt_identity()
    items = FoodItem.query.filter_by(user_id=current_user['id']).all()

    result = [{
        'id': item.id,
        'name': item.name,
        'quantity': item.quantity,
        'location': item.location,
        'expiry': item.expiry
    } for item in items]

    return jsonify(result)

# 🔁 PUT /food/<id> – Update a food item
@app.route('/food/<int:id>', methods=['PUT'])
def update_food(id):
    data = request.get_json()
    food = FoodItem.query.get(id)

    if not food:
        return jsonify({'error': 'Food item not found'}), 404

    food.name = data.get('name', food.name)
    food.quantity = data.get('quantity', food.quantity)
    food.location = data.get('location', food.location)
    food.expiry = data.get('expiry', food.expiry)

    db.session.commit()
    return jsonify({'message': 'Food item updated successfully'})

# ❌ DELETE /food/<id> – Delete a food item
@app.route('/food/<int:id>', methods=['DELETE'])
def delete_food(id):
    food = FoodItem.query.get(id)

    if not food:
        return jsonify({'error': 'Food item not found'}), 404

    db.session.delete(food)
    db.session.commit()
    return jsonify({'message': 'Food item deleted successfully'})

# ✅ Hello Test Route
@app.route('/hello', methods=['GET'])
def hello():
    return "Welcome to Food Bridge!"

# 🚀 Start the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
