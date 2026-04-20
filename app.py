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
        "description_es": "Aplicación web fullstack diseñada para ayudar a las empresas a gestionar inventario, clientes y operaciones de stock de manera eficiente.",
        "problem": "Small businesses lack centralized tools for managing inventory, invoicing, and clients in one place.",
        "problem_es": "Las pequeñas empresas carecen de herramientas centralizadas para gestionar inventario, facturación y clientes en un solo lugar.",
        "tech_decision": "Chose React 19 + Flask as a decoupled API so each layer can scale and be tested independently.",
        "tech_decision_es": "Se eligió React 19 + Flask como API desacoplada para que cada capa pueda escalar y probarse de forma independiente.",
        "tech": ["Python", "Flask", "React19", "PostgreSQL", "SQLAlchemy", "REST APIs", "JWT", "Vite"],
        "github": "https://github.com/Sanchochx/GesTrack",
        "demo": None,
    },
    {
        "title": "Secure Voting Management System",
        "description": "Full-stack web application focused on secure user and vote management.",
        "description_es": "Aplicación web fullstack enfocada en la gestión segura de usuarios y votos.",
        "problem": "Digital voting systems are vulnerable to vote manipulation and lack meaningful auditability.",
        "problem_es": "Los sistemas de votación digital son vulnerables a la manipulación de votos y carecen de una auditabilidad significativa.",
        "tech_decision": "Implemented vote hashing and unique per-voter tokens to guarantee integrity without exposing voter identity.",
        "tech_decision_es": "Se implementó hash de votos y tokens únicos por votante para garantizar la integridad sin exponer la identidad del votante.",
        "tech": ["Python", "Flask", "MySQL", "REST API", "CSS", "HTML"],
        "github": "https://github.com/Sanchochx/final_project_seguridad_dev",
        "demo": None,
    },
    {
        "title": "AI-Assisted 2D Platformer",
        "description": "A fully-featured 2D platformer game that demonstrates the power of human-AI collaboration through Claude Code and agile development methodologies.",
        "description_es": "Un juego de plataformas 2D completo que demuestra el poder de la colaboración humano-IA mediante Claude Code y metodologías ágiles.",
        "problem": "Traditional 2D game development requires designing every asset and physics interaction manually, making iteration slow.",
        "problem_es": "El desarrollo tradicional de juegos 2D requiere diseñar cada asset e interacción física manualmente, haciendo la iteración lenta.",
        "tech_decision": "Used AI-assisted development via Claude Code for level design and user story mapping, cutting prototyping time significantly.",
        "tech_decision_es": "Se usó desarrollo asistido por IA mediante Claude Code para diseño de niveles y mapeo de historias de usuario, reduciendo significativamente el tiempo de prototipado.",
        "tech": ["Python", "Agile Methodologies", "AI-Assisted Development", "Pygame", "User Story Mapping"],
        "github": "https://github.com/Sanchochx/coffee_bros",
        "demo": None,
    },
    {
        "title": "Linear Programming Calculator",
        "description": "For the final project of the Optimization course, I developed a calculator that provides an intuitive interface for defining and solving linear programming problems.",
        "description_es": "Para el proyecto final del curso de Optimización, desarrollé una calculadora con una interfaz intuitiva para definir y resolver problemas de programación lineal.",
        "problem": "Solving linear programming problems manually is error-prone and time-consuming in academic and engineering contexts.",
        "problem_es": "Resolver problemas de programación lineal manualmente es propenso a errores y consume mucho tiempo en contextos académicos e ingeniería.",
        "tech_decision": "Integrated PuLP as the open-source solver with a Flask interface that accepts constraints dynamically from the user.",
        "tech_decision_es": "Se integró PuLP como solver de código abierto con una interfaz Flask que acepta restricciones dinámicas del usuario.",
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
