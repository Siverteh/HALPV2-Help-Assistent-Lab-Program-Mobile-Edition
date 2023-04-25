import pytest
import requests

def test_get_helplist_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Helplist?course=IKT205-G
    request = requests.get("https://chanv2.duckdns.org:7006/api/Helplist?course=IKT205-G")
    assert request.status_code==200

def test_get_helplist_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Helplist?course=IKT201-G
    request = requests.get("https://chanv2.duckdns.org:7006/api/Helplist?course=-1")
    assert request.status_code==404

def test_put_helplist_to_archived_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Helplist?id=1
    request = requests.put("https://chanv2.duckdns.org:7006/api/Helplist?id=8")
    assert request.status_code==200

def test_put_helplist_to_archived_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Helplist?id=-1
    request = requests.put("https://chanv2.duckdns.org:7006/api/Helplist?id=-1")
    assert request.status_code==404
    
def test_get_archived_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Archive?course=IKT205-G
    request = requests.get("https://chanv2.duckdns.org:7006/api/Archive?course=IKT205-G")
    assert request.status_code==200

def test_get_archived_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Archive?course=IKT201-G
    request = requests.get("https://chanv2.duckdns.org:7006/api/Archive?course=-1")
    assert request.status_code==404

def test_put_archived_to_helplist_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Archive?id=1
    request = requests.put("https://chanv2.duckdns.org:7006/api/Archive?id=8")
    assert request.status_code==200

def test_put_archived_to_helplist_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Archive?id=-1
    request = requests.put("https://chanv2.duckdns.org:7006/api/Archive?id=-1")
    assert request.status_code==404
    
def test_post_register_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/register
    payload =   {
                    "email": "test@test.no",
                    "username": "testUser",
                    "password": "Password1.",
                    "discordTag": "test#1234"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payload)
    assert request.status_code==201

def test_post_register_invalid_email():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/register
    payload =   {
                    "email": "test@test.no",
                    "username": "testUserEmail",
                    "password": "Password1.",
                    "discordTag": "testEmail#1234"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payload)
    assert request.status_code==400
    
def test_post_register_invalid_username():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/register
    payload =   {
                    "email": "testUsername@test.no",
                    "username": "testUser",
                    "password": "Password1.",
                    "discordTag": "testUsername#1234"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payload)
    assert request.status_code==400
    
def test_post_register_invalid_password():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/register
    # Test with different passwords that should be invalid
    l = ["Password.", "Password1", "password1.", "PASSWORD1.", "passwor"]
    for password in l:
        payload =   {
                        "email": "testPassword@test.no",
                        "username": "testUserPassword",
                        "password": password,
                        "discordTag": "testUsername#1234"
                    }
        request = requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payload)
        assert request.status_code==400
    
def test_post_register_invalid_discord():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/register
    payload =   {
                    "email": "testDiscord@test.no",
                    "username": "testDiscord",
                    "password": "Password1.",
                    "discordTag": "test#1234"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payload)
    assert request.status_code==400
    
def test_post_login_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/login
    payload =   {
                    "email": "test@test.no",
                    "password": "Password1."
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/login", json=payload)
    assert request.status_code==200
    
def test_post_login_invalid_email():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/login
    payload = {
                                "email": "t@test.no",
                                "password": "Password1."
                            }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/login", json=payload)
    
    assert request.status_code==400
    
def test_post_login_invalid_password():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/login
    payload = {
                                "email": "test@test.no",
                                "password": "Pa."
                            }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/login", json=payload)
    
    assert request.status_code==400
    
def test_post_discord_register_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/discord/register
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
            
    payload =   {
                    "email": "testDiscord@test.no",
                    "username": "testDiscord",
                    "discordTag": "testDiscord#1234"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/discord/register", json=payload)
    
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
            
    assert request.status_code==201
    
def test_post_discord_register_invalid_email():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/discord/register
    payload =   {
                    "email": "testDiscord@test.no",
                    "username": "testDiscord",
                    "discordTag": "testDiscord#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/discord/register", json=payload)
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/discord/register", json=payload)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==400

def test_post_discord_login_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/discord/login
    payloadR =  {
                    "email": "testDiscord@test.no",
                    "username": "testDiscord",
                    "discordTag": "testDiscord#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/discord/register", json=payloadR)
    payloadL =  {
                    "email": "testDiscord@test.no",
                    "discordTag": "testDiscord#1234"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/discord/login", json=payloadL)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==200
    
def test_post_discord_login_invalid_email():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/discord/login
    payloadR =  {
                    "email": "testDiscord@test.no",
                    "username": "testDiscord",
                    "discordTag": "testDiscord#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/discord/register", json=payloadR)
    payloadL =  {
                    "email": "-1",
                    "discordTag": "testDiscord#1234"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/discord/login", json=payloadL)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==400
    
def test_post_discord_login_invalid_discordTag():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/Auth/discord/login
    payloadR =  {
                    "email": "testDiscord@test.no",
                    "username": "testDiscord",
                    "discordTag": "testDiscord#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/discord/register", json=payloadR)
    payloadL =  {
                    "email": "testDiscord@test.no",
                    "discordTag": "-1"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/Auth/discord/login", json=payloadL)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==400
    
    
def test_get_courses_all():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Courses/all
    request = requests.get("https://chanv2.duckdns.org:7006/api/Courses/all")
    assert request.status_code==200
    
def test_get_courses_studass_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Courses
    request = requests.get("https://chanv2.duckdns.org:7006/api/Courses?email=studass@uia.no")
    assert request.status_code==200

def test_get_courses_studass_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Courses
    request = requests.get("https://chanv2.duckdns.org:7006/api/Courses?email=test@test.no")
    assert request.status_code==404
    
#TODO Queue

def test_put_user_studass_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/studass
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user['id'],
                            "course": "IKT205-G",
                            "set": True
                        }
            request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/studass", json=payload)
            assert request.status_code==200
            break

def test_put_remove_user_studass_invalid_course():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/studass
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user['id'],
                            "course": "-1",
                            "set": False
                        }
            request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/studass", json=payload)
            assert request.status_code==404
            break

def test_put_remove_user_studass_invalid_userID():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/studass
    payload =   {
                    "userID": "-1",
                    "course": "IKT205-G",
                    "set": False
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/studass", json=payload)
    assert request.status_code==404

def test_put_remove_user_studass_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/studass
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user['id'],
                            "course": "IKT205-G",
                            "set": False
                        }
            request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/studass", json=payload)
            assert request.status_code==200
            break

def test_put_user_studass_invalid_userID():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/studass
    payload =   {
                    "userID": "-1",
                    "course": "IKT205-G",
                    "set": True
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/studass", json=payload)
    assert request.status_code==404
    
def test_put_user_studass_invalid_course():
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user['id'],
                            "course": "-1",
                            "set": False
                        }
            request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/studass", json=payload)
            assert request.status_code==404
            break
    
def test_put_user_admin_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/admin
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user['id'],
                            "set": True
                        }
            request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/admin", json=payload)
            assert request.status_code==200
            break

def test_put_remove_user_admin_invalid_userID():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/admin
    payload =   {
                    "userID": "-1",
                    "set": False
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/admin", json=payload)
    assert request.status_code==404

def test_put_remove_user_admin_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/admin
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user['id'],
                            "set": False
                        }
            request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/admin", json=payload)
            assert request.status_code==200
            break

def test_put_user_admin_invalid_userID():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Roles/admin
    payload =   {
                    "userID": "-1",
                    "set": True
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/Roles/admin", json=payload)
    assert request.status_code==404
    
def test_get_rooms():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Rooms
    request = requests.get("https://chanv2.duckdns.org:7006/api/Rooms")
    assert request.status_code==200

def test_post_ticket_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Ticket
    room = requests.get("https://chanv2.duckdns.org:7006/api/Rooms").json()[0]
    payload =   {
                    "name": "Test",
                    "room": room,
                    "description": "Test"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/api/Ticket", json=payload)
    assert request.status_code==200
    
    return request.json()

def test_post_ticket_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Ticket
    payload =   {
                    "name": "Test",
                    "room": "-1",
                    "description": "Test"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/api/Ticket", json=payload)
    assert request.status_code==404

def test_post_ticket_edit_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Ticket?ticketID=
    ticket = test_post_ticket_valid()
    payload =   {
                    "name": "TestEdit",
                    "room": ticket['room'],
                    "description": "TestEdit"
                }
    request = requests.post(f"https://chanv2.duckdns.org:7006/api/Ticket?ticketID={ticket['id']}", json=payload)
    assert request.status_code==200
    
def test_put_ticket_edit_invalid_room():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Ticket?ticketID=
    ticket = test_post_ticket_valid()
    payload =   {
                    "name": "TestEdit",
                    "room": "-1",
                    "description": "TestEdit"
                }
    request = requests.put(f"https://chanv2.duckdns.org:7006/api/Ticket?ticketID={ticket['id']}", json=payload)
    assert request.status_code==404
    
def test_put_ticket_edit_invalid_id():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Ticket?ticketID=
    ticket = test_post_ticket_valid()
    payload =   {
                    "name": "TestEdit",
                    "room": ticket['room'],
                    "description": "TestEdit"
                }
    request = requests.put(f"https://chanv2.duckdns.org:7006/api/Ticket?ticketID=-1", json=payload)
    assert request.status_code==404

def test_get_timeedit():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Timeedit
    request = requests.get("https://chanv2.duckdns.org:7006/api/Timeedit")
    assert request.status_code==200
    
def test_post_timeedit():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Timeedit?link=LINK
    request = requests.post("https://chanv2.duckdns.org:7006/api/Timeedit?link=LINK")
    assert request.status_code==200
    return request.json()["id"]

def test_delete_timeedit_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Timeedit?id=ID
    request = requests.delete(f"https://chanv2.duckdns.org:7006/api/Timeedit?id={test_post_timeedit()}")
    assert request.status_code==200
    
def test_delete_timeedit_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/Timeedit?id=ID
    request = requests.delete(f"https://chanv2.duckdns.org:7006/api/Timeedit?id=-1")
    assert request.status_code==404
    
def test_put_edit_user_invalid_id():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User
    payload =   {
                    "id": "-1",
                    "nickname": "testEdit",
                    "email": "testEdit@test.no",
                    "discordTag": "testEdit#1234",
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==404
    
def test_put_edit_user_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "id": user['id'],
                            "nickname": "testEdit",
                            "email": "testEdit@test.no",
                            "discordTag": "testEdit#1234",
                        }
            request = requests.put("https://chanv2.duckdns.org:7006/api/User", json=payload)
            assert request.status_code==200
            break
    
def test_put_edit_user_password_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User/changePassword
    payload =   {
                    "email": "testEdit@test.no",
                    "password": "Password.1"
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/User/changePassword", json=payload)
    assert request.status_code==200

def test_put_edit_user_password_invalid_email():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User/changePassword
    payload =   {
                    "email": "-1",
                    "password": "Password.1"
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/User/changePassword", json=payload)
    assert request.status_code==404

def test_put_edit_user_password_invalid_password():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User/changePassword
    payload =   {
                    "email": "testEdit@test.no",
                    "password": "."
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/User/changePassword", json=payload)
    assert request.status_code==404

def test_delete_user_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testEdit@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            request = requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
            assert request.status_code==200
            
def test_delete_user_invalid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User
    payload =   {
                    "userID": "-1",
                }
    request = requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==404

def test_post_forgot_password_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User/ForgottenPassword
    payloadR =   {
                    "email": "test@test.no",
                    "username": "testUser",
                    "password": "Password1.",
                    "discordTag": "test#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payloadR)
    
    payloadF =   {
                    "email": "test@test.no"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/api/User/ForgottenPassword", json=payloadF)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==200
            
def test_post_forgot_password_invalid_email():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User/ForgottenPassword
    payloadR =   {
                    "email": "test@test.no",
                    "username": "testUser",
                    "password": "Password1.",
                    "discordTag": "test#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payloadR)
    
    payloadF =   {
                    "email": "-1"
                }
    request = requests.post("https://chanv2.duckdns.org:7006/api/User/ForgottenPassword", json=payloadF)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "testDiscord@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==404
    
def test_put_confirm_email_valid():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User/ConfirmEmail
    payloadR =   {
                    "email": "test@test.no",
                    "username": "testUser",
                    "password": "Password1.",
                    "discordTag": "test#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payloadR)
    
    payloadF =   {
                    "email": "test@test.no"
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/User/ConfirmEmail", json=payloadF)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==200
            
def test_put_confirm_email_invalid_email():
    # Send a https request to the server at this endpoint https://chanv2.duckdns.org:7006/api/User/ConfirmEmail
    payloadR =   {
                    "email": "test@test.no",
                    "username": "testUser",
                    "password": "Password1.",
                    "discordTag": "test#1234"
                }
    requests.post("https://chanv2.duckdns.org:7006/Auth/register", json=payloadR)
    
    payloadF =   {
                    "email": "-1"
                }
    request = requests.put("https://chanv2.duckdns.org:7006/api/User/ConfirmEmail", json=payloadF)
    
    users = requests.get("https://chanv2.duckdns.org:7006/api/User/all")
    users = users.json()
    for user in users:
        if user['email'] == "test@test.no":
            payload =   {
                            "userID": user["id"],
                        }
            requests.delete("https://chanv2.duckdns.org:7006/api/User", json=payload)
    assert request.status_code==404
            
def main():
    test_post_ticket_edit_valid()
    print('Why')
   
    
if __name__ == '__main__':
    main()