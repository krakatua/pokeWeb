import { signOut } from 'firebase/auth'
import React from 'react'
import { auth, db, firebaseDB } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../redux/reducers/userSlice';
import { closeLoginModal, closeSignupModal } from '../redux/reducers/modalSlice';
import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

function Mylist() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [list, setList] = useState({});

    async function handleSignOut() {
        await signOut(auth);
        dispatch(signOutUser)
        dispatch(closeSignupModal())
        dispatch(closeLoginModal());
    }
    useEffect(() => {
      const q = query(collection(db, "pokemonList"), orderBy('uid', 'desc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setList(snapshot.docs)
      });
      
      return unsubscribe;
      
    }, [user]);
    console.log(list)


  return (
    <div className='mt-20'>
        <button onClick={handleSignOut}>Sign Out</button>

        <div>
          
        </div>

    </div>
  )
}

export default Mylist