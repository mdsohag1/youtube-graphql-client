import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import PlayVideoPage from "./components/PlayVideoPage/PlayVideoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import SigninModal from "./components/SigninModal/SigninModal";
import { useSelector } from "react-redux";
import Search from "./components/Search/Search";
import { SkeletonTheme } from "react-loading-skeleton";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
   .currentUser.token;

const client = new ApolloClient({
   cache: new InMemoryCache(),
   uri: "http://localhost:5000/graphql",
   headers: {
      authorization: token ? `Bearer ${token}` : "",
   },
});

function App() {
   const { currentUser } = useSelector((state) => state.user);
   return (
      <ApolloProvider client={client}>
         <div className="App">
            <SkeletonTheme baseColor="#E9E9ED" highlightColor="#F5F5F5">
               <BrowserRouter>
                  <Header />
                  <Routes>
                     <Route index element={<Home type={"random"} />} />
                     <Route path="/trend" element={<Home type={"trend"} />} />
                     <Route path="/search" element={<Search />} />
                     <Route
                        path="/subscription"
                        element={
                           currentUser ? <Home type={"sub"} /> : <SigninModal />
                        }
                     />
                     <Route
                        path="/video/:videoId"
                        element={<PlayVideoPage />}
                     />
                     <Route path="/profile/:profileId" element={<Profile />} />
                     <Route path="/signin" element={<SigninModal />} />
                  </Routes>
               </BrowserRouter>
            </SkeletonTheme>
         </div>
      </ApolloProvider>
   );
}

export default App;
