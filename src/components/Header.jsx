import { BiSolidDonateHeart } from "react-icons/bi";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.container}>
      <p className={classes.title}>Zelper</p>
      <BiSolidDonateHeart className={classes.img} />
    </header>
  );
}
