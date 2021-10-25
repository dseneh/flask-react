from datetime import datetime, timedelta
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
import re

from Profile import app
from Profile.database.models import User, RecoveryCode, Profile
from uuid import uuid4

from Profile.errors import *
from Profile.mail_service import send_email
from Profile.routes import get_all_data


def validate_email(email):
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

    if re.search(regex, email):
        return True
    else:
        return False


@app.route('/api/auth/users', methods=['GET'], strict_slashes=False)
@jwt_required
def get_users():
    user_id = get_jwt_identity()
    current_user = User.objects(_id=user_id).first()
    if not current_user:
        return InvalidToken

    if not current_user.active:
        return InactiveUser

    if not current_user.is_admin:
        return UnauthorizedError
    data = []
    users = User.objects.all()

    for user in users:
        u = {
            '_id': user._id,
            'email': user.email,
            'active': user.active,
            'is_admin': user.is_admin
        }
        data.append(u)
    return jsonify({"users": data}), 200


@app.route('/api/auth/me', methods=['GET'], strict_slashes=False)
@jwt_required
def get_me():
    user_id = get_jwt_identity()
    user = User.objects(_id=user_id).first()
    if not user:
        return InvalidToken

    if not user.active:
        return InactiveUser

    usr = {'_id': user._id, 'email': user.email, 'active': user.active, 'is_admin': user.is_admin}
    return jsonify({"user": usr}), 200


@app.route('/api/auth/users', methods=['POST'], strict_slashes=False)
# @jwt_required
def create_user():
    user_id = get_jwt_identity()
    data = request.get_json()

    if 'email' and 'password' not in data:
        return {'msg': 'Email and password are required.'}, 403
    #
    # current_user = User.objects(_id=user_id).first()
    # if not current_user:
    #     return {'error': 'Invalid token provided.'}, 403
    #
    # if not current_user.active:
    #     return {'error': 'This account is disabled.'}, 403
    usr = User.objects(email=data['email']).first()
    if usr:
        return EmailNotUnique

    # if not current_user.is_admin:
    #     return {'error': 'You are not authorized to make this request.'}, 401
    if not validate_email(data['email']):
        return {'msg': "Invalid email address"}, 403

    data['_id'] = uuid4().hex
    user = User(**data)
    user.hash_password()
    user.save()
    return {'msg': 'User created successfully.'}, 201


@app.route('/api/auth/user/<id>/set_admin', methods=['PUT'], strict_slashes=False)
@jwt_required
def set_admin(id):
    user_id = get_jwt_identity()
    current_user = User.objects(_id=user_id).first()

    if not current_user:
        return InvalidToken

    if not current_user.active:
        return InactiveUser

    if not current_user.is_admin:
        return UnauthorizedError

    user = User.objects(_id=id).first()

    if not user:
        return UserDoesNotExist

    if not user.is_admin:
        user.is_admin = True
        user.save()
        return {'msg': 'User is now an admin.'}, 200
    else:
        user.is_admin = False
        user.save()
        return {'msg': 'User is no longer an admin.'}, 200


@app.route('/api/auth/user/<id>/set_enable', methods=['PUT'], strict_slashes=False)
@jwt_required
def set_enable(id):
    user_id = get_jwt_identity()
    current_user = User.objects(_id=user_id).first()

    if not current_user:
        return InvalidToken

    if not current_user.active:
        return InactiveUser

    if not current_user.is_admin:
        return UnauthorizedError

    user = User.objects(_id=id).first()

    if not user:
        return UserDoesNotExist

    if not user.active:
        user.active = True
        user.save()
        return {'msg': 'User is now enabled.'}, 200
    else:
        user.active = False
        user.save()
        return {'msg': 'User is now disabled.'}, 200


@app.route('/api/auth/user/<id>', methods=['PUT'], strict_slashes=False)
@jwt_required
def put_user(id):
    user_id = get_jwt_identity()

    data = request.get_json()
    if 'email' not in data:
        return {'msg': 'Email is not provided.'}, 403

    current_user = User.objects(_id=user_id).first()
    if not current_user:
        return InvalidToken

    if not current_user.active:
        return InactiveUser

    if not current_user.is_admin and user_id != current_user._id:
        return UnauthorizedError

    user = User.objects(_id=id).first()

    if not user:
        return UserDoesNotExist

    if user.username == data['email']:
        return UserNotUnique

    user.email = data['email']
    user.admin = data['admin']
    user.active = data['active']
    user.save()
    return {'user': user}, 201


@app.route('/api/auth/user/<id>/change_password', methods=['PUT'], strict_slashes=False)
@jwt_required
def change_password(id):
    user_id = get_jwt_identity()

    data = request.get_json()
    if 'password' not in data:
        return {'msg': 'Password is not provided.'}, 403

    current_user = User.objects(_id=user_id).first()
    if not current_user:
        return InvalidToken

    if not current_user.active:
        return InactiveUser

    if not current_user.is_admin and user_id != current_user._id:
        return UnauthorizedError

    user = User.objects(_id=id).first()

    if not user:
        return UserDoesNotExist

    user.password = data['password']
    user.hash_password()
    user.save()
    return {'msg': 'Password has been changed.'}, 201


@app.route('/api/auth/user/<id>', methods=['GET'], strict_slashes=False)
@jwt_required
def get_user(id):
    user_id = get_jwt_identity()
    current_user = User.objects(_id=user_id).first()

    if not current_user:
        return InvalidToken

    if not current_user.active:
        return InactiveUser

    user = User.objects(_id=id).first()

    usr = {'_id': user._id, 'email': user.email, 'active': user.active, 'is_admin': user.is_admin}
    return jsonify({"users": usr}), 200


@app.route('/api/auth/user/<id>', methods=['DELETE'], strict_slashes=False)
@jwt_required
def delete(id):
    user_id = get_jwt_identity()
    current_user = User.objects(_id=user_id).first()

    if not current_user:
        return InvalidToken

    if not current_user.active:
        return InactiveUser

    if not current_user.is_admin:
        return UnauthorizedError

    user = User.objects(_id=id).first()

    if not user:
        return {'msg': 'User does not exist.'}, 401

    User.objects(_id=id).delete()
    return {'msg': 'User has been deleted.'}, 200


@app.route('/api/auth/login', methods=['POST'], strict_slashes=False)
def login():
    data = {}
    body = request.get_json()
    if 'email' and 'password' not in body:
        return InvalidCredentials

    user = User.objects(email=body['email']).first()

    if user:
        authorized = user.check_password(body['password'])
        if not authorized:
            return {"msg": "email and password do not match."}, 403

        if not user.active:
            return InactiveUser

        expires = timedelta(days=7)
        access_token = create_access_token(identity=str(user._id), expires_delta=expires)
        data['token'] = access_token
        data['userId'] = user._id

        profile = Profile.objects().first()

        if not profile:
            pId = uuid4().hex
            profile = Profile(_id=pId, email=user.email)
            profile.save()

        data['data'] = get_all_data()

        return data, 200

    return InvalidCredentials


@app.route('/api/auth/recover_password', methods=['POST'], strict_slashes=False)
def recover_password():
    import uuid
    data = request.get_json()
    subject = "Account Recovery"
    if 'email' not in data:
        return {'msg': "Email is not provided."}, 403

    user = User.objects(email=data['email']).first()

    if not user:
        return {'msg': "Email does not exist."}, 403

    code = str(uuid4().fields[-1])[:5]

    recovery = RecoveryCode.objects(user=user._id).first()
    if recovery:
        recovery.code = code
        recovery.created_at = datetime.now()
        recovery.expires_at = datetime.now() + timedelta(minutes=10)
        recovery.save()
    else:
        recovery = RecoveryCode(_id=uuid.uuid4().hex, user=user._id, code=code)
        recovery.save()

    # data['body'] = f'This is your recovery code: \n ' \
    #                f'{code} \n' \
    #                f'This code expires in 10 minutes.'

    # msg = Message(
    #     subject=subject,
    #     recipients=[user.email],
    #     sender=data['dseneh@gmail.com'],
    #     body=data['body']
    # )
    # mail.send(msg)
    # return {'msg': 'Recovery code sent to email.'}, 200
    def temp(code):
        html = f"<p>Dear User,</p> \n" \
               f"<p>This is your account recovery code:</p> \n" \
               f"\n<h5 style='color:grey; font-size:1.3rem;'>{code}</h5> \n" \
               f"<p>Please note that this code expires in 10 minutes.</p> \n" \
               f"<br/>\n<p>Sincerely,</p> \n" \
               f"<p>MyProfile Team</p> \n"
        return html

    def text(code):
        text = f"Dear User, \n" \
               f"This is your account recovery code: \n" \
               f"\n {code} \n" \
               f"Please note that this code expires in 10 minutes. \n" \
               f"\nSincerely, \n" \
               f"MyProfile Team \n"
        return text

    send_email(subject,
               sender=app.config['DEFAULT_SENDER'],
               recipients=[user.email],
               text_body=text(code),
               html_body=temp(code)
               )
    return {'msg': "Code sent to email."}, 201


@app.route('/api/auth/verify_code', methods=['POST'], strict_slashes=False)
def verify_code():
    data = request.get_json()
    db = {}
    if 'code' not in data:
        return {'msg': "Verification code not provided."}, 403

    code = RecoveryCode.objects(code=data['code']).first()
    if not code:
        return {'msg': "Invalid code."}, 403

    now = datetime.now()
    if now > code.expires_at:
        return {'msg': "Code expired."}, 403

    user = User.objects(_id=code.user).first()
    if not user:
        return {'msg': "User does not exist."}, 403

    expires = timedelta(days=7)
    access_token = create_access_token(identity=str(user._id), expires_delta=expires)
    db['token'] = access_token
    db['id'] = user._id
    return db