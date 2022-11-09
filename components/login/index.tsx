import React, { SyntheticEvent } from 'react';

const Login = () => {
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return <div className="container main-container">
    <div className="row">
      <div className="col s12 m8 l6 offset-m2 offset-l3">
        <h1>Login</h1>
        <div className="card-panel">
          <div className="row no-margin-bottom">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Email:</label><input type="text" />
              </div>
              <div className="field">
                <label>Password:</label><input type="password" />
              </div>
              <div className="actions">
                <div className="card-action right-align">
                  <input type="submit" value="Login" className="btn" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Login;
