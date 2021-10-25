from uuid import uuid4
from flask import jsonify, request, render_template
from flask_jwt_extended import jwt_required, get_jwt_identity

from Profile import app
from Profile.database.models import Work, Skills, Education, Profile, Contact, User
from Profile.errors import InvalidToken
from Profile.mail_service import send_email


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/', strict_slashes=False)
def index():
    return app.send_static_file('index.html')

# @app.route('/', strict_slashes=False)
# def index():
#     return render_template('static/build/index.html')


def get_all_data():
    data = {}
    profile = Profile.objects.first()
    work = Work.objects(active=True).order_by('-order')
    contact = Contact.objects(active=True).order_by('-order')
    education = Education.objects(active=True).order_by('-order') #.order_by('-end')
    skills = Skills.objects(active=True).first()
    if not skills or len(skills.skills) < 3:
        skills = None
    data['profile'] = profile
    data['work'] = work
    data['work_count'] = work.count()
    data['education'] = education
    data['education_count'] = education.count()
    data['skillsSet'] = skills
    data['contact'] = contact
    data['contact_count'] = contact.count()
    return data


@app.route('/api/profilelist', methods=['GET'], strict_slashes=False)
def profile_all():
    data = get_all_data()
    return data


@app.route('/api/profile', methods=['GET'], strict_slashes=False)
def profile():
    profile = Profile.objects.first()
    return {'profile': profile}


@app.route('/api/profile', methods=['POST'], strict_slashes=False)
@jwt_required
def profile_post():
    data = request.get_json()
    data['_id'] = uuid4().hex
    profile = Profile(**data)
    profile.save()
    return {'profile': profile}, 201


@app.route('/api/profile_init', methods=['GET'], strict_slashes=False)
@jwt_required
def profile_post_init():
    user_id = get_jwt_identity()
    current_user = User.objects(_id=user_id).first()

    if not current_user:
        return InvalidToken

    profile = Profile.objects().first()

    if not profile:
        pId = uuid4().hex
        profile = Profile(_id=pId, email=current_user.email)
        profile.save()

    data = get_all_data()

    return {'profile': data}, 201


@app.route('/api/profile/toggle_status', methods=['PUT'], strict_slashes=False)
# @jwt_required
def profile_deactivate():
    profile = Profile.objects().first()
    if profile.active:
        profile.active = False
        profile.save()
        return {'msg': 'Profile has been deactivated.'}, 200

    profile.active = True
    profile.save()
    return {'msg': 'Profile has been reactivated.'}, 200


@app.route('/api/profile/<id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required
def profile_put_delete(id):
    profile = Profile.objects(_id=id).first()

    if request.method == 'PUT':
        data = request.get_json()
        profile.first_name = data['first_name']
        profile.last_name = data['last_name']
        profile.email = data['email']
        profile.phone = data['phone']
        profile.linkedin = data['linkedin']
        profile.image = data['image']
        profile.occupation = data['occupation']
        profile.about = data['about']
        profile.active = data['active']
        profile.save()
        return {'profile': profile}, 201

    if request.method == 'DELETE':
        Profile.objects(_id=id).delete()
        return {'message': 'Profile has been deleted successfully'}, 200


@app.route('/api/work', methods=['GET'], strict_slashes=False)
def work_get():
    work = Work.objects.order_by('-order')
    return jsonify({"work": work})


@app.route('/api/work', methods=['POST'], strict_slashes=False)
@jwt_required
def work_post():
    count = Work.objects.count()
    data = request.get_json()
    data['_id'] = uuid4().hex
    work = Work(**data)
    work['order'] = int(count + 1)
    work.save()
    return {'work': work}, 201


@app.route('/api/work/<id>', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required
def work_put_delete(id):
    work = Work.objects(_id=id).first()

    if request.method == 'GET':
        return {'work': work}, 200

    if request.method == 'PUT':
        data = request.get_json()
        work.title = data['title']
        work.desc = data['desc']
        work.start = data['start']
        work.end = data['end']
        work.company = data['company']
        work.current = data['current']
        work.location = data['location']
        work.active = data['active']
        work.order = data['order']
        work.save()
        return {'work': work}, 201

    if request.method == 'DELETE':
        Work.objects(_id=id).delete()
        return {'msg': 'Work has been deleted successfully'}, 200


@app.route('/api/education', methods=['GET'], strict_slashes=False)
def education_get():
    education = Education.objects.order_by('-order')
    return jsonify({"education": education})


@app.route('/api/education', methods=['POST'], strict_slashes=False)
@jwt_required
def education_post():
    count = Education.objects.count()
    data = request.get_json()
    data['_id'] = uuid4().hex
    education = Education(**data)
    education['order'] = count + 1
    education.save()
    return {'education': education}, 201


@app.route('/api/education/<id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required
def education_put_delete(id):
    education = Education.objects(_id=id).first()

    if request.method == 'PUT':
        data = request.get_json()
        education.type = data['type']
        education.institution = data['institution']
        education.start = data['start']
        education.study = data['study']
        education.location = data['location']
        education.end = data['end']
        education.active = data['active']
        education.current = data['current']
        education.desc = data['desc']
        education.order = data['order']
        education.save()
        return {'education': education}, 201

    if request.method == 'DELETE':
        Education.objects(_id=id).delete()
        return {'msg': 'Education has been deleted successfully'}, 200


@app.route('/api/skills', methods=['GET'], strict_slashes=False)
def skills_get():
    skills = Skills.objects.first()
    if skills is None:
        skills = {}
    return {"skills": skills}, 200


@app.route('/api/skills', methods=['POST'], strict_slashes=False)
@jwt_required
def skills_post():
    data = request.get_json()
    data['_id'] = uuid4().hex
    skills = Skills(**data)
    skills.save()
    return {'skills': skills}, 201


@app.route('/api/skills/<id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required
def skills_put_delete(id):
    skills = Skills.objects(_id=id).first()

    if request.method == 'PUT':
        data = request.get_json()
        skills.skills = data['skills']
        skills.active = data['active']
        skills.save()
        return {'skills': skills}, 201

    if request.method == 'DELETE':
        Skills.objects(_id=id).delete()
        return {'message': 'Skills has been deleted successfully'}, 200


@app.route('/api/contact', methods=['GET'], strict_slashes=False)
def contact_get():
    contact = Contact.objects.order_by('-order')
    return jsonify({"contact": contact})


@app.route('/api/contact', methods=['POST'], strict_slashes=False)
@jwt_required
def contact_post():
    count = Contact.objects.count()
    data = request.get_json()
    data['_id'] = uuid4().hex
    contact = Contact(**data)
    contact['order'] = count + 1
    contact.save()
    return {'contact': contact}, 201


@app.route('/api/contact/<id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required
def contact_put_delete(id):
    contact = Contact.objects(_id=id).first()

    if request.method == 'PUT':
        data = request.get_json()
        contact.type = data['type']
        contact.title = data['title']
        contact.url = data['url']
        contact.active = data['active']
        contact.order = data['order']
        contact.save()
        return {'contact': contact}, 201

    if request.method == 'DELETE':
        Contact.objects(_id=id).delete()
        return {'message': 'Contact has been deleted successfully'}, 200


@app.route('/api/send_email', methods=['POST'], strict_slashes=False)
# @jwt_required
def send_me_email():
    profile = Profile.objects().first()
    data = request.get_json()
    subject = "Resume Request from App"
    if 'email' and 'name' and 'body' not in data:
        return {'msg': "Email, body and name required."}, 403

    name = data['name']

    def temp(name, email, body):
        html = f"<h3>Resume Request</h3> \n" \
               f"<p><strong style='color: orange;'>{name}</strong> is requesting for your resume.</p> \n" \
               f"<br/>\n<strong>MESSAGE:</strong> \n" \
               f"<p style='color: grey;'>{body}</p> \n" \
               f"<p>Requester's name: <strong>{name}</strong></p> \n" \
               f"<p>Requester's email: <strong>{email}</strong></p> \n"
        return html

    send_email(subject,
               sender=app.config['DEFAULT_SENDER'],
               recipients=[profile.email],
               text_body=temp(name=name, email=data['email'], body=data['body']),
               html_body=temp(name=name, email=data['email'], body=data['body'])
               )

    return {'msg': 'Email sent successfully'}, 200


