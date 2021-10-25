InvalidToken = {"msg": "Token is invalid.",
                "status": 401}, 401

InactiveUser = {"msg": "This account is inactive.",
                "status": 403}, 403

InvalidCredentials = {"msg": "Invalid login credentials provided.",
                      "status": 403}, 403

UnauthorizedError = {"msg": "You are not authorized to make this request.",
                     "status": 401}, 401

ServerSideError = {"msg": "There was an error executing your request.",
                   "status": 500}, 500

UserDoesNotExist = {"msg": "The user you are trying to access does not exist.",
                    "status": 404}, 404

UserNotUnique = {"msg": "User with this username already exists.",
                 "status": 403}, 403

EmailNotUnique = {"msg": "User with this email already exists.",
                  "status": 403}, 403

PostDoesNotExist = {"msg": "The post you are trying to access does not exist.",
                    "status": 404}, 404

BibleVerseDoesNotExist = {"msg": "The bible verse you are trying to access does not exist.",
                          "status": 404}, 404
