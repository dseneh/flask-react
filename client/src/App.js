import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import {isLoggedIn as logging, loader, loadError as error, ProfileData} from "./store/atom"
import {useSetRecoilState, useRecoilState} from "recoil";
import axios from "axios";


function App() {
    const [data, setData] = useRecoilState(ProfileData)
    const setLoading = useSetRecoilState(loader)
    const setLoadError = useSetRecoilState(error)
    const setIsLoggedIn = useSetRecoilState(logging)

    React.useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await axios.get(`${process.env.REACT_APP_API}/api/profilelist`)
                .then(res => {
                    if (res.data && res.data.profile && res.data.profile){
                        setData(res.data)
                    } else {
                        setLoadError(true)
                        setIsLoggedIn(false)
                        localStorage.clear()
                        return data
                    }
                    setLoadError(false)
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    localStorage.clear()
                    setLoadError(true)
                    setLoading(false)
                })
            // return result
        }
        fetch();

        const token = localStorage.getItem('TKID')
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [])
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/build" exact component={Dashboard}/>
            </Switch>
        </Router>
    );
}

export default App;
