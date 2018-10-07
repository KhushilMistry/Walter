import firebase from '../firebase';

export const signIn = (query) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_START' })
    firebase.auth().signInWithEmailAndPassword(query.email, query.password).then((user) => {
      const itemsRef = firebase.database().ref().child('Users').child(user.user.uid)
      itemsRef.once('value').then(function (snap) {
        const userValue = snap.val()
        const userKey = snap.key
        dispatch({ type: 'SIGN_IN', data: userValue, key: userKey })
        dispatch({ type: 'ERROR_CLEAR' })
        dispatch({ type: 'LOADING_END' })
      })
    }).catch(() => {
      dispatch({ type: 'ERROR', error: 'Wrong Password or Email.' })
      dispatch({ type: 'LOADING_END' })
    })
  }
}

export const signUp = (query) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_START' })
    firebase.auth().createUserWithEmailAndPassword(query.email, query.password).then((user) => {
      try {
        const userData = {
          username: query.username,
          email: query.email,
          number: query.number,
          events: []
        }
        const uid = user.user.uid
        firebase.database().ref().child('Users').child(uid).set(userData)
        firebase.database().ref().child('Users').child(uid).once('value').then(function (snap) {
          const userValue = snap.val()
          const userKey = snap.key
          dispatch({ type: 'SIGN_UP', data: userValue, key: userKey })
          dispatch({ type: 'LOADING_END' })
          dispatch({ type: 'ERROR_CLEAR' })
        });
      }
      catch (e) {
        console.log(e)
      }
    }).catch((error) => {
      dispatch({ type: 'ERROR', error: 'Email Already Exists.' })
      dispatch({ type: 'LOADING_END' })
    });
  }
}

export const logOut = (query) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_START' })
    dispatch({ type: 'SIGN_OUT' })
    dispatch({ type: 'LOADING_END' })
  }
}

export const addReco = (list) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_START' })
    let shortList = list.slice(2, 7)
    dispatch({ type: 'ADD_RECO', data: shortList })
    dispatch({ type: 'LOADING_END' })
  }
}

export const addEvent = (event, key) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_START' })
    firebase.database().ref().child('Events').push(event)
    firebase.database().ref().child('Users').child(key).child('events').push(event).then(() => {
      firebase.database().ref().child('Users').child(key).once('value').then(function (snap) {
        const userValue = snap.val()
        dispatch({ type: 'ADD_EVENT', data: userValue })
        dispatch({ type: 'LOADING_END' })
      });
    })
  }
}
