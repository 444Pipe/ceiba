import os
from flask import Flask, render_template
from whitenoise import WhiteNoise

app = Flask(__name__)
# Wrap the application with WhiteNoise for serving static files efficiently
app.wsgi_app = WhiteNoise(app.wsgi_app, root=os.path.abspath(os.path.join(os.path.dirname(__file__), 'static')), prefix='/static/')

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    # Robustly handle the port environment variable
    try:
        port_str = os.environ.get('PORT', '5000').strip()
        port = int(port_str) if port_str else 5000
    except (ValueError, TypeError):
        port = 5000
        
    # Running on 0.0.0.0 makes it accessible across the network (e.g., in a container)
    app.run(host='0.0.0.0', port=port, debug=True)
