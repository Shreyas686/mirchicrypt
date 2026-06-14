import styles from "./nav.scss";
import classNames from "classnames/bind";
import Hamburger from "../public/icons/hamburger.svg";
import Link from "next/link";

import { useState } from "react";

let cx = classNames.bind(styles);

const Nav = ({ setSideBarOpen, active, setActive }) => {
  const SideBarToggle = () => {
    return (
      <button
        className={styles.sidebar__toggle}
        onClick={() => {
          setSideBarOpen((state) => !state);
        }}
      >
        <Hamburger />
      </button>
    );
  };

  return (
    <header className={styles["nav"]}>
      <nav className={styles.nav__main_body}>
        <div>
          <SideBarToggle />
        </div>
        <div className={styles.nav__logo}>
          <h2>MirchiCrypt 1.0</h2>
        </div>
        <div className={styles.nav__spacer}></div>
        <div>
          <ul className={styles.nav__link_container}>
            <Link href="/">
              <li
                className={cx(
                  styles.nav__link,
                  active == 0 ? styles.active : ""
                )}
              >
                Home
              </li>
            </Link>
            <Link href="/play">
              <li
                className={cx(
                  styles.nav__link,
                  active == 1 ? styles.active : ""
                )}
              >
                Play
              </li>
            </Link>
            <Link href="/leaderboard">
              <li
                className={cx(
                  styles.nav__link,
                  active == 2 ? styles.active : ""
                )}
              >
                Leaderboard
              </li>
            </Link>
            <Link href="/rules">
              <li
                className={cx(
                  styles.nav__link,
                  active == 2 ? styles.active : ""
                )}
              >
                Rules
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const SideDrawer = ({ show, active, setActive }) => {
  console.log(active);
  return (
    <nav className={cx(styles.sidebar, show ? styles.sidebar__open : "")}>
      <ul>
        <li className={styles.sidebar_inactive}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.sidebar_inactive}>
          <Link href="/play">Play</Link>
        </li>
        <li className={styles.sidebar_inactive}>
          <Link href="/leaderboard">Leaderboard</Link>
        </li>
        <li className={styles.sidebar_inactive}>
          <Link href="/rules">Rules</Link>
        </li>
      </ul>
    </nav>
  );
};

const Backdrop = ({ setSideBarOpen }) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() => setSideBarOpen((state) => !state)}
    ></div>
  );
};
export default Nav;

export { SideDrawer, Backdrop };
