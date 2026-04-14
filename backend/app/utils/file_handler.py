import json

FILE_PATH = "app/data/users.json"

def read_users():
    try:
        with open(FILE_PATH, "r") as file:
            return json.load(file)
    except:
        return []

def write_users(users):
    with open(FILE_PATH, "w") as file:
        json.dump(users, file, indent=4)

        