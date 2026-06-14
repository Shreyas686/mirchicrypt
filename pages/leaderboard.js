import ErrorScreen from "../components/error";
import { useSession } from "next-auth/client";
import { useState, useEffect } from "react";
import LoadingFullScreen from "../components/helping";
import axios from "axios";
import { useRouter } from "next/router";
import Nav, { SideDrawer, Backdrop } from "../components/nav";
import styles from "../styles/leaderboard.scss";

const Leaderboard = () => {
  const [session, loading] = useSession();
  const [isLoading, setLoading] = useState(true);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get("/api/leaderboard").then(({ data }) => {
      if (data.success) {
        setSuccess(true);
        setLeaderboard(data.lb);
        setLoading(false);
      } else {
        setSuccess(false);
        setErrMsg(data.message);
        setLoading(false);
      }
    });
  }, [loading]);

  return loading || isLoading ? (
    <LoadingFullScreen />
  ) : !success ? (
    <ErrorScreen message={errMsg} />
  ) : success && session ? (
    <div className={styles.main}>
      <Nav setSideBarOpen={setSideBarOpen} /> <SideDrawer show={sideBarOpen} />
      {sideBarOpen ? (
        <>
          <Backdrop setSideBarOpen={setSideBarOpen} />
        </>
      ) : null}
      <h1 className={styles.main__header}>Leaderboard</h1>
      <LeaderBoard lb={leaderboard} />
    </div>
  ) : (
    <ErrorScreen message="An error occured" />
  );
};

export default Leaderboard;

const LeaderBoard = ({ lb }) => {
  let position = 0;

  return (
    <div className={styles.main__lb}>
      <div className={styles.main__lb__row}>
        <div className={styles.main__lb__sn}>Pos.</div>
        <div className={styles.main__lb__username}>Username</div>
        <div className={styles.main__lb__level}>Level</div>
      </div>
      {lb.map((person) => {
        !person.nonComp && !person.disqualified ? (position += 1) : null;
        return (
          <div className={styles.main__lb__row}>
            <div className={styles.main__lb__sn}>
              {!person.nonComp && !person.disqualified ? position : ""}
            </div>
            <div className={styles.main__lb__username}>
              {person.username.slice(0, -5)}
            </div>
            <div className={styles.main__lb__level}>{person.currentLevel}</div>
          </div>
        );
      })}
    </div>
  );
};
