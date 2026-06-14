import styles from "../styles/rules.scss";
import Nav, { SideDrawer, Backdrop } from "../components/nav";
import { useState } from "react";

const Rules = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <div className={styles.main}>
      <Nav setSideBarOpen={setSideBarOpen} /> <SideDrawer show={sideBarOpen} />
      {sideBarOpen ? (
        <>
          <Backdrop setSideBarOpen={setSideBarOpen} />
        </>
      ) : null}
      <div className={styles.header}>
        <h1 className={styles.header}>
          <b>Rules</b>
        </h1>
      </div>
      <div className={styles.rules}>
        <p>
          <div className={styles.point}>
            <h6>1.</h6> The hunt will commence on December 25, 2020 at 12:00 noon and will end on December 28, 2020
            at 23:59
          </div>
          <div className={styles.point}>
            <h6>2.</h6> Login is only enabled through your Discord ID to avoid
            alting and sharing accounts.
          </div>
          <div className={styles.point}>
            <h6>3.</h6> Any person found sharing leads will be immediately
            disqualified and action will be taken.
          </div>
          <div className={styles.point}>
            <h6>4.</h6> Hunt is significantly easier than interschool ones but
            has the same feel.
          </div>
          <div className={styles.point}>
            <h6>5.</h6> Lead confirmations are open, this means that if you want
            to ask if you are going in right direction, you can ask the admin
            and he will reply in yes/no. For lead confirmations DM ‘tomato#9898’
            in 1 message only. Don’t spam, be considerate of the admins' sleep
            so avoid asking leads late at night.
          </div>
          <div className={styles.point}>
            <h6>6.</h6> Answers will be in lowercase, without spaces, without
            special characters. For eg "helloiamindian"
            "johnsdancingtalentisoutofthisworld"
          </div>
          <div className={styles.point}>
            <h6>7.</h6> You can check your place on the Leaderboard whenever you
            want.
          </div>
          <div className={styles.point}>
            <h6>8.</h6> Hints will be rolled out if multiple persons are stuck
            on a particular level for quite a while.
          </div>
          <div className={styles.point}>
            <h6>9.</h6> There will be a total of 16 questions and you will have
            48 hours to attempt them (exact times coming soon)
          </div>
        </p>
      </div>
    </div>
  );
};

export default Rules;
