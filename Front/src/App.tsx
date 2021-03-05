import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { fetchPosts } from "./components/Feed/ContentCreator/postSlice";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import LeftBar from "./components/LeftBar/LeftBar";
import RightBar from "./components/RightBar/RightBar";
import SignUp from "./components/SignUp/SignUp";
import { addUser } from "./components/SignUp/userSlice";
import { auth } from "./firebase";
import { RootState } from "./store";

function App() {
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }
      const { email, refreshToken } = user;
      const verify = Boolean(email) && Boolean(refreshToken);
      verify && dispatch(addUser({ email, refreshToken }));
    });
    return () => unregisterAuthObserver();
  }, []);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/">
            {email ? (
              <>
                <div className="App">
                  <Header />
                  <div className="App__body">
                    <LeftBar />
                    <Feed />
                    <RightBar />
                  </div>
                </div>
              </>
            ) : (
              <SignUp />
            )}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
