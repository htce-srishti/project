from fastapi import APIRouter,UploadFile, File, Form
from app.schemas.user_schema import User, LoginUser
from app.utils.file_handler import read_users, write_users
import cloudinary.uploader
from app.utils.cloudinary_config import *



router = APIRouter()

# Signup
@router.post("/signup")
def signup(user: User):
    users = read_users()

    # check if already exists
    for u in users:
        if u["email"] == user.email:
            return {"message": "User already exists"}

    users.append(user.dict())
    write_users(users)

    return {"message": "Signup successful"}


# Login
@router.post("/login")
def login(user: LoginUser):
    users = read_users()

    for u in users:
        if u["email"] == user.email and u["password"] == user.password:
            return {"message": "Login successful", "user": u}

    return {"message": "Invalid credentials"}



@router.put("/update-profile")
async def update_profile(
    email: str = Form(...),
    name: str = Form(...),
    file: UploadFile = File(None)
):
    users = read_users()

    for user in users:
        if user["email"] == email:

            user["name"] = name

            if file:
                if not file.content_type.startswith("image/"):
                    return {"message": "Only image allowed"}

                result = cloudinary.uploader.upload(file.file)
                user["image"] = result["secure_url"]

            write_users(users)

            return {
                "message": "Profile updated",
                "user": user
            }

    return {"message": "User not found"}