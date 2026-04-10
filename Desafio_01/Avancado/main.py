from flask import Flask, render_template

app = Flask(__name__)
@app.route('/')#criar pagina
def hello_world():#mostrar
    return render_template('homepage.html')


if __name__ == '__main__': #Só roda se estiver sendo executado por aq
    app.run(debug=True)

