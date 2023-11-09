import { useCallback, useEffect, useState } from 'react';
import styles from './SearchPage.module.css';
import { getApiResource } from '@utils/network';
import { API_SEARCH } from '@constants/api';
import { withErrorApi } from '@hoc-helpers/withErrorApi';
import { getPeopleId, getPeopleImage } from '@services/getPeopleData';
import SearchPageInfo from '@components/SearchPage/SearchPageInfo';
import { debounce } from 'lodash';

const SearchPage = ({setErrorApi}) => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [people, setPeople] = useState([]);

  const getResponse = async param => {
    const res = await getApiResource(API_SEARCH+param);

    if (res) {
      const peopleList = res.results.map(({name, url}) => {
        const id = getPeopleId(url);
        const img = getPeopleImage(id);
        return {
          id,
          name,
          img
        }
      });
      setPeople(peopleList);
      setErrorApi(false);
    } else {
      setErrorApi(true);
    }
  }

  useEffect(() => {
    getResponse('');
  }, []);

  const debouncedGetResponse = useCallback(debounce(value => getResponse(value), 700), []);

  const handleInputChange = (event) => {
    setInputSearchValue(event.target.value);
    debouncedGetResponse(event.target.value);
  }

  return (
    <>
      <h1 className='header__text'>Search</h1>
      <input 
        type="text" 
        value={inputSearchValue}
        onChange={handleInputChange}
        placeholder='input character name'
      />
      <SearchPageInfo people={people} />
    </>
  )
}

export default withErrorApi(SearchPage);