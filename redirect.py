from flask import Flask, request, make_response, redirect, render_template, session, flash

app = Flask(__name__)

@app.route('/')
def inicio():
    return render_template('main.html', initial_content_template='start.html')

@app.route('/get-content/<page_name>')
def get_content(page_name):
    if page_name in ['start', 'home', 'about', 'projects', 'contact']:
        return render_template(f'{page_name}.html')
    return "Contenido no encontrado", 404

if __name__ == '__main__':
    app.run(debug=True)