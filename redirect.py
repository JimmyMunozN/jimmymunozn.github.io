from flask import Flask, render_template, send_from_directory
from flask_frozen import Freezer
import os
from dotenv import load_dotenv
import sys

if os.path.exists('/etc/secrets/.env'):
    load_dotenv('/etc/secrets/.env')
else:
    load_dotenv()

app = Flask(__name__, 
            static_folder='static',
            static_url_path='/static',
            template_folder='templates')

@app.route('/')
def inicio():
    return render_template('main.html', initial_content_template='start.html')

@app.route('/get-content/<page_name>')
def get_content(page_name):
    if page_name in ['start', 'home', 'about', 'projects', 'contact']:
        return render_template(f'{page_name}.html')
    return "Contenido no encontrado", 404


@app.route('/downloadCV')
def downloadCV():
    directory = app.root_path + '/static/downloads/'

    filename = 'JimmyMunoz_CV.pdf'
    
    download_name = 'CV_JimmyMuñoz_Junior-FullStack.pdf'

    return send_from_directory(
        directory,
        filename,
        as_attachment=True,
        download_name=download_name
    )

freezer = Freezer(app)

@freezer.register_generator
def get_content_generator():
    for page in ['start', 'home', 'about', 'projects', 'contact']:
        yield 'get_content', {'page_name': page}

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'freeze':
        freezer.freeze()
        print("¡Congelado completado! Revisa la carpeta 'build/'.")
    else:
        app.run(debug=True)