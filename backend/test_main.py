from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}

def test_read_users():
    """Test getting all users"""
    response = client.get("/users")
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
    assert len(users) > 0
    assert all(key in users[0] for key in ["id", "firstName", "lastName", "age", "gender", "email", "phone"])

def test_edit_user_success():
    """Test successfully updating a user's data"""
    user_id = 1
    updated_data = {
        "firstName": "Johnny",
        "age": 35
    }
    response = client.put(f"/users/{user_id}", json=updated_data)
    assert response.status_code == 200
    updated_user = response.json()
    assert updated_user["firstName"] == "Johnny"
    assert updated_user["age"] == 35
    assert updated_user["lastName"] == "Doe"
    assert updated_user["id"] == user_id

def test_edit_user_not_found():
    """Test updating a non-existent user"""
    user_id = 999
    updated_data = {
        "firstName": "Johnny",
        "age": 35
    }
    response = client.put(f"/users/{user_id}", json=updated_data)
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}

def test_edit_user_partial_update():
    """Test updating only one field for a user"""
    user_id = 2
    updated_data = {"email": "jane.doe@newemail.com"}
    response = client.put(f"/users/{user_id}", json=updated_data)
    assert response.status_code == 200
    updated_user = response.json()
    assert updated_user["email"] == "jane.doe@newemail.com"
    assert updated_user["firstName"] == "Jane Doe"
    assert updated_user["lastName"] == "Doe"
    assert updated_user["age"] == 30
    assert updated_user["gender"] == "female"
    assert updated_user["phone"] == "123-456-7890"
    assert updated_user["id"] == user_id

def test_edit_user_no_update_data():
    """Test update with no data provided (should keep the user unchanged)"""
    user_id = 3
    response = client.put(f"/users/{user_id}", json={})
    assert response.status_code == 200
    unchanged_user = response.json()
    assert unchanged_user["id"] == user_id
    assert unchanged_user["firstName"] == "Alice"
    assert unchanged_user["lastName"] == "Doe"
    assert unchanged_user["age"] == 30
    assert unchanged_user["gender"] == "female"
    assert unchanged_user["email"] == "alice@doe.com"
    assert unchanged_user["phone"] == "123-456-7890"
