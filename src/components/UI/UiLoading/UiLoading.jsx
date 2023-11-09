import styles from './UiLoading.module.css';
import loaderBlack from './img/loader-black.svg';
import loaderBlue from './img/loader-blue.svg';
import loaderWhite from './img/loader-white.svg';
import { useState, useEffect } from 'react';
import cn from 'classnames';


const UiLoading = ({theme, isShadow=true}) => {
  const [loaderIcon, setLoaderIcon] = useState(null);

  useEffect(() => {
    switch (theme) {
      case 'black': setLoaderIcon(loaderBlack);
        break;
      case 'white': setLoaderIcon(loaderWhite);
        break;
      case 'blue': setLoaderIcon(loaderBlue);
        break;
      default: setLoaderIcon(loaderWhite);
        break;
    }
  })

  return (
    <img
      className={cn(styles.loader, isShadow && styles.shadow, styles.classes)}
      src={loaderIcon}
      alt='loader'
    />
  )
}

export default UiLoading;