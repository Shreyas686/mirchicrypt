import { useSession } from "next-auth/client";
import { useState, useEffect } from "react";
import LoadingFullScreen from "../components/helping";
import axios from "axios";
import ErrorScreen from "../components/error";
import Nav, { SideDrawer, Backdrop } from "../components/nav";
import styles from "../styles/play.scss";
import { useRouter } from "next/router";

const Play = () => {
  const [session, loading] = useSession();
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [level, setLevel] = useState({});
  const [message, setMessage] = useState();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [refresher, setRefresher] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios.get("/api/play/currentLevel").then((res) => {
      if (!res.data.success) {
        setSuccess(false);
        setMessage(res.data.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setLevel(res.data.level);
        setLoading(false);
      }
    });
  }, [loading, refresher]);

  return loading || isLoading ? (
    <LoadingFullScreen />
  ) : !success ? (
    <ErrorScreen message={message} />
  ) : success && session ? (
    <div className={styles.main}>
      <Nav setSideBarOpen={setSideBarOpen} /> <SideDrawer show={sideBarOpen} />
      {sideBarOpen ? (
        <>
          <Backdrop setSideBarOpen={setSideBarOpen} />
        </>
      ) : null}
      <PlayComponent level={level} setRefresh={setRefresher} />
    </div>
  ) : (
    <ErrorScreen message="An error occured" />
  );
};

export default Play;

const PlayComponent = ({ level, setRefresh }) => {
  const [attempt, setAttempt] = useState("");
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  const router = useRouter();

  function onSubmit(value) {
    setProcessing(true);
    setSuccess(true);
    setMessage("");
    const stripped = value.toLowerCase().replace(/\s/g, "");
    console.log(stripped);

    if (stripped == "") {
      setSuccess(false);
      setMessage("Please fill out this field");
    } else {
      axios
        .post("/api/play/attempt", { attempt: stripped })
        .then(({ data }) => {
          if (!data.success) {
            setSuccess(false);
            setMessage(data.message);
            setProcessing(false);
          } else if (data.success) {
            setProcessing(false);
            // setRefresh(e => !e)
              router.reload('/play')
          }
        });
    }
  }

  return (
    <div>
      <h2>{`Level ${level.level} - "${level.name}"`}</h2>
      <h4>{level.question}</h4>
      {level.attachments.length > 0 && (
        <div>
          <div className={styles.main__attachments}>
            {level.attachments.map((attach) => {
              return (
                <a target="_blank" href={attach.path}>
                  <h6>{attach.name}</h6>
                </a>
              );
            })}
          </div>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(attempt);
        }}
      >
        <div
          className={styles.main__submit_area}
          style={{
            marginTop: level.attachments.length < 1 ? "35vh" : "24vh",
          }}
        >
          <input
            placeholder="Your Answer"
            className={styles.main__textbox}
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
          />
          <button className={styles.main__submitButton}>
            <p>{!processing ? "Submit" : "Loading..."}</p>
          </button>
        </div>
      </form>
      {!success && (
        <h6 style={{ marginTop: "7px", color: "red", fontSize: "11px" }}>
          {message}
        </h6>
      )}
    </div>
  );
};
