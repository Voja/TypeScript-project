import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { isStudent, Prijava, Profesor, Student } from './model';
import Login from './components/Login';
import Loading from './components/Loading';
import axios from 'axios';
import { SERVER_URL } from './util';
import IspitiPage from './pages/IspitiPage';
import PredmetiPage from './pages/PredmetiPage';
import ObavezePage from './pages/ObavezePage';
import PredatePrijavePage from './pages/PredatePrijavePage';
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

  const prijavi = (data: Prijava) => {

    setUser((prev) => {
      if (isStudent(prev)) {
        return {
          ...prev, prijave: [
            ...prev.prijave, data
          ]
        }
      }
      return prev;

    })


  }
  const izmeniPrijavu = (data: Prijava) => {

    setUser((prev) => {
      if (isStudent(prev)) {
        return {
          ...prev, prijave: prev.prijave.map(element => {
            if (element.seminarski.id === data.seminarski.id) {
              return data;
            }
            return element;
          })
        }
      }
      return prev;

    })

  }
  const obrisiPrijavu = (semId: number) => {
    setUser((prev) => {
      if (isStudent(prev)) {
        return {
          ...prev, prijave: prev.prijave.filter(element => {
            return element.seminarski.id !== semId

          })
        }
      }
      return prev;

    })
  }
  const logout = () => {
    axios.post(SERVER_URL + '/logout').then(res => {
      setUser(undefined);
    })
  }
  return (
    <BrowserRouter>
      <Navbar logout={logout} user={user} />

      {
        user && isStudent(user) && (
          <Switch>

            <Route path='/obaveze'>
              <ObavezePage
                prijavi={prijavi}
                seminarski={user.slusa.flatMap(element => {
                  return element.seminarski.filter(sem => {
                    return user.prijave.find(prijava => prijava.seminarski.id === sem.id) === undefined
                  })
                })} />
            </Route>
            <Route path='/predato'>
              <PredatePrijavePage prijave={user.prijave} izmeniPrijavu={izmeniPrijavu} obrisiPrijavu={obrisiPrijavu} />
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
