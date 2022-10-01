from fastapi.testclient import TestClient
from .main import app

# How to run:
# python3 -m pytest
#    or 
# python -m pytest

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

# ----- /user ------ #

# def test_sign_in():
#     response = client.post("/user/signup/", json={"email": "test@gmail.com", "password": "melbee"})
#     expected = {
#         "email": "test@gmail.com",
#         "id": 1
#     }
#     assert response.status_code == 200
#     assert response.json() == expected

