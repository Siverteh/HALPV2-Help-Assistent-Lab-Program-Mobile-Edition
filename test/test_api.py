import pytest
import requests

BASE_URL = "https://chanv2.duckdns.org:7006"

@pytest.fixture
def test_ticket_and_cleanup():
    # This code will be executed before the tests are run.
    # It deletes any test users that were created during previous test runs.
    # This ensures that the test environment is clean before running the tests.

    # Register a test user
    payload =   {
                    "name": "Test", 
                    "room": "", 
                    "description": "Test"
                }
    
    payload["room"] = send_request("GET", "api/Rooms").json()[0]
    respons = send_request("POST", "api/Ticket", json=payload)
    yield respons
    # This code will be executed after the tests are run.
    # It deletes any test users that were created during the tests.
    # This ensures that the test environment is clean after running the tests.
    payload =   {
                    "id": respons.json()["id"]
                }
    send_request("DELETE", "api/Ticket", json=payload)
    

@pytest.fixture
def test_user_and_cleanup():
    # This code will be executed before the tests are run.
    # It deletes any test users that were created during previous test runs.
    # This ensures that the test environment is clean before running the tests.

    # Register a test user
    payload = {
        "email": "test@test.no",
        "username": "test",
        "password": "Password1.",
        "discordTag": "test"
    }
    send_request("POST", "Auth/register", json=payload)
    yield
    # This code will be executed after the tests are run.
    # It deletes any test users that were created during the tests.
    # This ensures that the test environment is clean after running the tests.
    response = send_request("GET", "api/User/all")
    for user in response.json():
        if user["email"].startswith("test"):
            payload =   {
                            "userID": user["id"],
                        }
            send_request("DELETE", "api/User", json=payload)
    
def testuser_id():
    response = send_request("GET", "api/User/all")
    for user in response.json():
        if user["email"] == "test@test.no":
            return user["id"]

def send_request(method, endpoint, **kwargs):
    url = f"{BASE_URL}/{endpoint}"
    return requests.request(method, url, **kwargs)

@pytest.mark.parametrize("course,expected_status_code", [
    ("IKT205-G", 200),
    ("-1", 404)
])
def test_get_helplist(course, expected_status_code):
    response = send_request("GET", "api/Helplist", params={"course": course})
    assert response.status_code == expected_status_code

@pytest.mark.parametrize("id, expected_status_code", [
    ("", 204),
    ("-1", 404)
])
def test_put_helplist_to_archived(test_ticket_and_cleanup, id, expected_status_code):
    if id == "":
        id = test_ticket_and_cleanup.json()["id"]
    response = send_request("PUT", "api/Helplist", params={"id": id})
    assert response.status_code == expected_status_code

@pytest.mark.parametrize("course,expected_status_code", [
    ("IKT206-G", 200),
    ("-1", 404)
])
def test_get_archived(test_ticket_and_cleanup, course, expected_status_code):
    respons1 = send_request("PUT", "api/Archive", params={"id": test_ticket_and_cleanup.json()["id"]})
    assert respons1.status_code == 204
    response = send_request("GET", "api/Archive", params={"course": course})
    assert response.status_code == expected_status_code

@pytest.mark.parametrize("id,expected_status_code", [
    ("", 204),
    ("-1", 404)
])
def test_put_archived_to_helplist(test_ticket_and_cleanup, id, expected_status_code):
    if id == "":
        id = test_ticket_and_cleanup.json()["id"]
        send_request("PUT", "api/Archive", params={"id": id})
    response = send_request("PUT", "api/Archive", params={"id": id})
    assert response.status_code == expected_status_code

@pytest.mark.parametrize("payload,expected_status_code", [
    ({"email": "testCreate@test.no", "username": "testUser", "password": "Password1.", "discordTag": "test#1234"}, 201),
    ({"email": "testCreateBlankDiscord@test.no", "username": "testCreateBlankDiscord", "password": "Password1.", "discordTag":""}, 201),
    ({"email": "test@test.no", "username": "testEmail", "password": "Password1.", "discordTag": "testEmail#1234"}, 400),
    ({"email": "testUsername@test.no", "username": "test", "password": "Password1.", "discordTag": "testUsername#1234"}, 400),
    ({"email": "testDiscord@test.no", "username": "testDiscord", "password": "Password1.", "discordTag": "test"}, 400),
])
def test_post_register(test_user_and_cleanup, payload, expected_status_code):
    response = send_request("POST", "Auth/register", json=payload)
    if response.status_code != expected_status_code:
        print(response.json())
    assert response.status_code == expected_status_code

@pytest.mark.parametrize("password", [
    "Password.", "Password1", "password1.", "PASSWORD1.", "passwor"
])
def test_post_register_invalid_password(password):
    payload = {
        "email": "testPassword@test.no",
        "username": "testUserPassword",
        "password": password,
        "discordTag": "testUsername#1234"
    }
    response = send_request("POST", "Auth/register", json=payload)
    assert response.status_code == 400
    
@pytest.mark.parametrize("payload,expected_status_code", [
    ({"id": "", "nickname": "testEdit", "email": "testEdit@test.no.", "discordTag": "testEdit#1234"}, 204),
    ({"id": "-1", "nickname": "testID", "email": "testID@test.no.", "discordTag": "testID#1234"}, 404),
])
def test_put_edit_user(test_user_and_cleanup, payload, expected_status_code):
    if payload["id"] == "":
        payload["id"] = testuser_id()
    response = send_request("PUT", "api/User", json=payload)
    assert response.status_code == expected_status_code
    
@pytest.mark.parametrize("payload,expected_status_code", [
    ({"email": "test@test.no", "oldPassword": "Password1.", "newPassword": "Password.1"}, 204),
    ({"email": "-1", "oldPassword": "Password1.", "newPassword": "Password1."}, 404),
    ({"email": "test@test.no", "oldPassword": "Password1.", "newPassword": "Pass"}, 400),
])
def test_put_edit_password(test_user_and_cleanup, payload, expected_status_code):
    response = send_request("PUT", "api/User/ChangePassword", json=payload)
    assert response.status_code == expected_status_code
    
@pytest.mark.parametrize("payload,expected_status_code", [
    ({"email": "testCreate@test.no", "username": "testCreate", "discordTag":"testCreate#1234"}, 201),
    ({"email": "test@test.no", "username": "testEmail", "discordTag":"testEmail#1234"}, 400),
    ({"email": "testUsername@test.no", "username": "test", "discordTag":"testUsername#1234"}, 400),
    ({"email": "testDiscord@test.no", "username": "testDiscord", "discordTag":"test"}, 400),
])      
def test_post_discord_register(test_user_and_cleanup, payload, expected_status_code):
    response = send_request("POST", "Auth/discord/register", json=payload)
    assert response.status_code == expected_status_code
    
def test_delete_user(test_user_and_cleanup):
    delete_response = send_request("DELETE", "api/User", json={"userID": testuser_id()})
    assert delete_response.status_code == 204
    invalid_response = send_request("DELETE", "api/User", json={"userID": "-1"})
    assert invalid_response.status_code == 404
    
def test_get_all_courses():
    response = send_request("GET", "api/Courses/all")
    assert response.status_code == 200


@pytest.mark.parametrize("email, expected_status", [
    ("studass@uia.no", 200), 
    ("admin@uia.no", 200), 
    ("test@test.no", 404)
    ])
def test_get_studasses_courses(email, expected_status):
    request = requests.get(f"https://chanv2.duckdns.org:7006/api/Courses?email={email}")
    assert request.status_code == expected_status
    
@pytest.mark.parametrize("endpoint, expected_status, payload", [
    ("api/Roles/studass", 204, {"userID": "", "course": "IKT205-G", "set": True}),
    ("api/Roles/studass", 404, {"userID": "-1", "course": "IKT205-G", "set": True}),
    ("api/Roles/studass", 404, {"userID": "", "course": "-1", "set": True}),
    ("api/Roles/studass", 204, {"userID": "", "course": "IKT205-G", "set": False}),
    ("api/Roles/studass", 404, {"userID": "-1", "course": "IKT205-G", "set": False}),
    ("api/Roles/studass", 404, {"userID": "", "course": "-1", "set": False}),
    ("api/Roles/admin", 204, {"userID": "", "set": True}),
    ("api/Roles/admin", 404, {"userID": "-1", "set": True}),
    ("api/Roles/admin", 400, {"userID": "", "set": False}),
    ("api/Roles/admin", 404, {"userID": "-1", "set": False}),
])
def test_put_user_roles(test_user_and_cleanup, endpoint, expected_status, payload):
    if payload["userID"] == "":
        payload["userID"] = testuser_id()
    response = send_request("PUT", endpoint, json=payload)
    assert response.status_code == expected_status
    
    
def test_get_rooms():
    request = send_request("GET", "api/Rooms")
    assert request.status_code==200
    
@pytest.mark.parametrize("create_payload, create_status, edit_payload, edit_status", [
    ({"name": "TestCreate", "room": "", "description": "TestCreate"}, 201, {"name": "TestEdit", "room": "", "description": "TestEdit"}, 200),
    ({"name": "Test", "room": "-1", "description": "Test"}, 404, {"name": "TestInvalidRoom", "room": "-1", "description": "TestInvalidRoom"}, 404),
])
def test_create_and_edit_ticket(create_payload, create_status, edit_payload, edit_status):
    if create_payload["room"] == "":
        create_payload["room"] = send_request("GET", "api/Rooms").json()[0]
    create_response = send_request("POST", "api/Ticket", json=create_payload)
    assert create_response.status_code == create_status

    if create_response.status_code == 201:
        ticket_id = create_response.json()["id"]
        edit_response = send_request("PUT", f"api/Ticket?ticketID={ticket_id}", json=edit_payload)
        assert edit_response.status_code == edit_status
        invalid_id_edit_response = send_request("PUT", "api/Ticket?ticketID=-1", json=edit_payload)
        assert invalid_id_edit_response.status_code == 404
        delete_response = send_request("DELETE", f"api/Ticket", json={"id": ticket_id})
        assert delete_response.status_code == 204
    else:
        edit_response = send_request("PUT", "api/Ticket?ticketID=1", json=edit_payload)
        assert edit_response.status_code == edit_status
        
def test_delete_ticket(test_ticket_and_cleanup):
    payload =   {
                    "id": test_ticket_and_cleanup.json()["id"]
                }
    send_request("DELETE", "api/Ticket", json=payload)
        
@pytest.mark.parametrize("link, expected_status", [
    ("https://www.timeedit.html", 201),
    ("https://www.timeedit.no", 400),
])
def test_timeedit_operations(link, expected_status):
    create_response = send_request("POST", f"api/Timeedit?link={link}")
    assert create_response.status_code == expected_status

    if create_response.status_code == 201:
        timeedit_id = create_response.json()["id"]

        get_response = send_request("GET", "api/Timeedit")
        assert get_response.status_code == 200

        delete_response = send_request("DELETE", f"api/Timeedit?id={timeedit_id}")
        assert delete_response.status_code == 204

        invalid_delete_response = send_request("DELETE", "api/Timeedit?id=-1")
        assert invalid_delete_response.status_code == 404
        
@pytest.mark.parametrize("payload, expected_status", [
    ({"email": "test@test.no"}, 204),
    ({"email": "-1"}, 404),
])
def test_forgotten_password(test_user_and_cleanup ,payload, expected_status):
    response = send_request("POST", "api/User/ForgottenPassword", json=payload)
    assert response.status_code == expected_status

@pytest.mark.parametrize("email, expected_status", [
    ({'email': 'test@test.no'}, 200),
    ({'email': '-1'}, 404),
])
def test_confirm_email(test_user_and_cleanup, email, expected_status):
    respns = send_request("POST", "api/User/ConfirmEmail", json=email)

if __name__ == "__main__":
    pytest.main()
    
