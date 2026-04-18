import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/health')
def health():
    return 'ok'

if __name__ == '__main__':
    # Robustly handle the port environment variable
    try:
        port_str = os.environ.get('PORT', '5000').strip()
        port = int(port_str) if port_str else 5000
    except (ValueError, TypeError):
        port = 5000
        
    # Running on 0.0.0.0 makes it accessible across the network (e.g., in a container)
    app.run(host='0.0.0.0', port=port, debug=True)
