import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './ChooseSide.module.css';
import { 
    THEME_DARK, 
    THEME_LIGHT, 
    THEME_NEITRAL,
    useTheme 
} from '@context/ThemeProvider';
import imgLightSide from './img/light-side.jpg';
import imgDarkSide from './img/dark-side.jpg';
import imgFalcon from './img/falcon.jpg';

const ChooseSideItem = ({
  classes,
  theme,
  text,
  img
}) => {
  const isTheme = useTheme();
  return (
    <div 
      className={cn(styles.item, classes)}
      onClick={() => isTheme.change(theme)}
    >
      <div className={styles.item__header}>{text}</div>
      <img className={styles.item__img} src={img} />
    </div>
  )
} 

const ChooseSide = () => {
  const elements = [
    {
      theme: THEME_LIGHT,
      text: 'Light Side',
      img: imgLightSide,
      classes: styles.item__light
    },
    {
      theme: THEME_DARK,
      text: 'Dark Side',
      img: imgDarkSide,
      classes: styles.item__dark
    },
    {
      theme: THEME_NEITRAL,
      text: "I'm Han Solo",
      img: imgFalcon,
      classes: styles.item__neitral
    }
  ]

  return (
    <div className={styles.container}>
        {elements.map((element, index) => (
          <ChooseSideItem 
            key={index}
            theme={element.theme}
            text={element.text}
            img={element.img}
            classes={element.classes}
          />
        ))}
    </div>
  )
}


ChooseSide.propTypes = {
    text: PropTypes.string
}

export default ChooseSide;