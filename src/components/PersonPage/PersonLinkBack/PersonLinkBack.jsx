import { useNavigate } from 'react-router-dom';
import styles from './PersonLinkBack.module.css';
import iconBack from './img/back.png';

const PersonLinkBack = () => {
    const history = useNavigate();

    const handleGoBack = (e) => {
        e.preventDefault();
        history(-1);
    }
  return (
    <a
        href="#"
        onClick={handleGoBack}
        className={styles.link}
    >
        <img className={styles.link__img} src={iconBack} alt="Go back" />
        <span>Go back</span>
    </a>
  )
}

export default PersonLinkBack;