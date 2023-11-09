import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './PersonFilms.module.css';
import { makeConcurrentRequest } from '@utils/network';


const PersonFilms = ({ personFilms }) => {
    const [FilmsName, setFilmsName] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await makeConcurrentRequest(personFilms);
            setFilmsName(response);
        })();
    }, [FilmsName])

  return (
    <div className={styles.wrapper}>
        <ul className={styles.list__container}>
            {FilmsName
            .sort((a, z) => a.episode_id - z.episode_id)
                .map(({title, episode_id}) => 
                    <li className={styles.list__item} key={episode_id}>
                        <span className={styles.item__episode}>Episode {episode_id}</span>
                        <span className={styles.item__colon}> : </span>
                        <span className={styles.item__title}>{ title }</span>
                    </li>
                )
            }
        </ul>
    </div>
  )
}

PersonFilms.propTypes = {
    personFilms: PropTypes.array
}

export default PersonFilms;