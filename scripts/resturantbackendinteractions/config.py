from dotenv import load_dotenv
import os

load_dotenv()



SECRET_KEY='os.getenv(SECRET_KEY)'
APP_NAME="os.getenv(APP_NAME)"
SQLALCHEMY_DATABASE_URI="mysql+mysqlconnector://root@localhost/chickydsresturant"