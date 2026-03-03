from flask import Flask, render_template, request, jsonify
from chatbot import Me

app = Flask(__name__)

_me = None
def get_me():
    global _me
    if _me is None:
        _me = Me()
    return _me

PROJECTS = [
    {
        "title": "GesTrack - Basic ERP Management System",
        "description": "Full-stack web application designed to help businesses manage inventory, clients, and stock operations efficiently.",
        "tech": ["Python", "Flask", "React19", "PostgreSQL", "SQLAlchemy", "REST APIs", "JWT", "Vite"],
        "github": "https://github.com/Sanchochx/GesTrack",
        "demo": None,
    },
    {
        "title": "Secure Voting Management System",
        "description": "Full-stack web application focused on secure user and vote management.",
        "tech": ["Python", "Flask", "MySQL", "REST API", "CSS", "HTML"],
        "github": "https://github.com/Sanchochx/final_project_seguridad_dev",
        "demo": None,
    },
    {
        "title": "AI-Assisted 2D Platformer",
        "description": "A fully-featured 2D platformer game that demonstrates the power of human-AI collaboration through Claude Code and agile development methodologies.",
        "tech": ["Python", "Agile Methodologies", "AI-Assisted Development", "Pygame", "User Story Mapping"],
        "github": "https://github.com/Sanchochx/coffee_bros",
        "demo": None,
    },
    {
        "title": "Linear Programming Calculator",
        "description": "For the final project of the Optimization course, I developed a calculator that provides an intuitive interface for defining and solving linear programming problems.",
        "tech": ["Optimization", "Linear Programming", "Pulp", "Flask", "Python"],
        "github": "https://github.com/Sanchochx/linear-programming-project",
        "demo": None,
    },
]


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/projects')
def projects():
    return render_template('projects.html', projects=PROJECTS)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    message = data.get('message', '').strip()
    history = data.get('history', [])
    if not message:
        return jsonify({"error": "Message is required"}), 400
    try:
        reply = get_me().chat(message, history)
        return jsonify({"reply": reply})
    except Exception as e:
        print(f"Chat error: {e}", flush=True)
        return jsonify({"error": "Internal server error"}), 500


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True)
