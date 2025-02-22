from flask import Flask, request, jsonify
from flask_cors import CORS
from database import mongo, init_db
from bson import ObjectId

app = Flask(__name__)
CORS(app)
init_db(app)

@app.route("/todos", methods=["GET"])
def get_todos():
    todos = list(mongo.db["todos"].find())
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    mongo.db["todos"].insert_one({"task": data["task"]})
    return jsonify({"message": "Todo added!"})

@app.route("/todos/<todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    mongo.db["todos"].delete_one({"_id": ObjectId(todo_id)})
    return jsonify({"message": "Todo deleted!"})

if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from database import mongo, init_db

# app = Flask(__name__)
# CORS(app)
# init_db(app)

# @app.route("/todos", methods=["GET"])
# def get_todos():
#     todos = list(mongo.db.todos.find({}, {"_id": 0}))  # Correct access
#     return jsonify(todos)

# @app.route("/todos", methods=["POST"])
# def add_todo():
#     data = request.json
#     mongo.db.todos.insert_one({"task": data["task"]})  # Correct access
#     return jsonify({"message": "Todo added!"})


# if __name__ == "__main__":
#     app.run(debug=True)