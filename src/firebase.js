import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCtH1WX-jmGVUdZ4XufF7mGGy3eSHXpt4Q',
  authDomain: 'comtnwx.firebaseapp.com',
  projectId: 'comtnwx',
  storageBucket: 'comtnwx.appspot.com',
  messagingSenderId: '26820713932',
  appId: '1:26820713932:web:565fcc1c4de468daa51169',
  measurementId: 'G-L4TPZNX0KT',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
