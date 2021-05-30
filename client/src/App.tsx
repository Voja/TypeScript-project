import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { isStudent, Profesor, Student } from './model';
import Login from './components/Login';
import Loading from './components/Loading';
import axios from 'axios';
import { SERVER_URL } from './util';
import IspitiPage from './pages/IspitiPage';
import PredmetiPage from './pages/PredmetiPage';
import ObavezePage from './pages/ObavezePage';
axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState<Student | Profesor | undefined>(undefined);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    axios.get(SERVER_URL + '/check').then(res => {
      setUser(res.data);

    }).finally(() => {
      setFetching(false)
    })
  }, [])
  const onLogin = async (val: any) => {
    const data = (await axios.post(SERVER_URL + '/login', val)).data;
    setUser(data);
  }
  if (fetching) {
    return (
      <Loading />
    )
  }

  return (
    <BrowserRouter>
      <Navbar user={user} />

      {
        user && isStudent(user) && (
          <Switch>

            <Route path='/obaveze'>
              <ObavezePage seminarski={user.slusa.flatMap(element => {
                return element.seminarski.filter(sem => {
                  return user.prijave.find(prijava => prijava.seminarski.id === sem.id) === undefined
                })
              })} />
            </Route>
            <Route path='/predato'>

            </Route>

            <Route path='/'>
              <PredmetiPage predmeti={user.slusa} />
            </Route>
          </Switch>
        )
      }

      {
        user && !isStudent(user) && (
          <Switch>
            <Route path='/ispit/:id'>
              Jedan ispit
            </Route>
            <Route path='/prijava'>
              Neocenjeni radovi
            </Route>
            <Route path='/'>
              <PredmetiPage predmeti={user.predaje} />
            </Route>
          </Switch>
        )
      }
      {
        !user && (
          <Switch>
            <Route path='/'>
              <Login onSubmit={onLogin} />
            </Route>
          </Switch>
        )
      }

    </BrowserRouter>
  );
}

export default App;
