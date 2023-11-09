import PropTypes from 'prop-types';
import { getApiResource } from '@utils/network';
import { API_PEOPLE } from '@constants/api';
import { getPeopleImage } from '@services/getPeopleData';
import { withErrorApi } from '@hoc-helpers/withErrorApi';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import styles from './PersonPage.module.css';
import { useParams } from 'react-router';
import { API_PERSON } from '../../constants/api';
import PersonInfo from '@components/PersonPage/PersonInfo';
import PersonPhoto from '@components/PersonPage/PersonPhoto';
import PersonLinkBack from '@components/PersonPage/PersonLinkBack';
import UiLoading from '@ui/UiLoading';

const PersonFilms = React.lazy(() => import('@components/PersonPage/PersonFilms'));

const PersonPage = ({setErrorApi}) => {
    const id = useParams().id;
    const [personId, setPersonId] = useState(null);
    const [personInfo, setPersonInfo] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personFilms, setPersonFilms] = useState(null);
    const [personFavorite, setPersonFavorite] = useState(false);

    const storeData = useSelector(state => state.favoriteReducer);

    useEffect(() => {
        (async () => {
            const res = await getApiResource(`${API_PERSON}/${id}/`);

            storeData[id] ? setPersonFavorite(true) : setPersonFavorite(false);

            setPersonId(id);

            if (res) {
                setPersonInfo([
                    { title: 'Height', data: res.height },
                    { title: 'Mass', data: res.mass },
                    { title: 'Hair color', data: res.hair_color },
                    { title: 'Skin color', data: res.skyn_color },
                    { title: 'Eye color', data: res.eye_color },
                    { title: 'Birth year', data: res.birth_year },
                    { title: 'Gender', data: res.gender },
                ]);
                setPersonName(res.name);
                setPersonPhoto(getPeopleImage(id));

                res.films.length && setPersonFilms(res.films);

                setErrorApi(false);
            } else {
                setErrorApi(true);
            }
        })();
    }, []);

  return (
    <>
        <PersonLinkBack />
        <div className={styles.wrapper}>
            <span className={styles.person__name}>{personName}</span>

            <div className={styles.container}>
                <PersonPhoto 
                    personId={personId}
                    personPhoto={personPhoto} 
                    personName={personName}
                    personFavorite={personFavorite}
                    setPersonFavorite={setPersonFavorite}
                />
                {personInfo && <PersonInfo personInfo={personInfo} />}
                {personFilms && (
                    <Suspense fallback={
                        <h1>
                            <UiLoading
                                theme="black"
                                isShadow
                                classes
                            />
                        </h1>
                    }>
                        <PersonFilms personFilms={personFilms} />
                    </Suspense>
                )}
            </div>
            
        </div>
    </>
  )
}

PersonPage.propTypes = {
    setErrorApi: PropTypes.func
}

export default withErrorApi(PersonPage);