authenticateAccessToken

const refreshToken = localStorage.getItem("refreshToken");
axios.defaults.headers.common["authorization"] = localStorage.getItem("accessToken");
const [expiredSession, setExpiredSession] = useState(false);

.catch((err) => {
    console.log("Session expirée, veuillez vous reconnecter.");
    return setExpiredSession(true)
  });

  if (expiredSession) return <RefreshSession />
