import { NavLink } from 'react-router-dom';
import Favorite from '@components/Favorite';
import { THEME_LIGHT, THEME_DARK, THEME_NEITRAL, useTheme } from '@context/ThemeProvider';
import imgDroid from './img/droid.svg';
import imgLightsaber from './img/lightsaber.svg';
import imgSpaceStation from './img/space-station.svg';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';


const Header = () => {
  const [icon, setIcon] = useState(imgSpaceStation);
  const isTheme = useTheme();

  useEffect(() => {
    switch (isTheme.theme) {
      case THEME_LIGHT: setIcon(imgLightsaber); break;
      case THEME_DARK: setIcon(imgSpaceStation); break;
      case THEME_NEITRAL: setIcon(imgDroid); break;
      default: setIcon(imgSpaceStation);
    }
  },[isTheme]);

  return (
    <div className={styles.container}>
        <img className={styles.logo} src={icon} />
        <ul className={styles.list__container}>
            <li><NavLink to="/" exact='true'>Home</NavLink></li>
            <li><NavLink to="/people/?page=1" exact='false'>People</NavLink></li>
            <li><NavLink to="/not-found" exact='true'>Not Found</NavLink></li>
            <li><NavLink to="/search" exact='true'>Search</NavLink></li>
        </ul>

        <Favorite />
    </div>
  )
}

export default Header;