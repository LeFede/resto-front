

import styles from './Show.module.css';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import app from '../../firebase.config';
import { useState, useEffect } from 'react';
import UserCard from '../Users/index';
import { User } from '@/types';

const firestore = getFirestore(app);



export const ShowCreatedUser = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const usersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
      console.log('Users Data:', usersData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

 
  const handleSoftDelete = async (userId: string) => {
    console.log('Handling soft delete for user ID:', userId);
    try {
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, { active: false });
      console.log('User deactivated successfully');
  
      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, active: false } : user
        )
      );
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  return (
    <div>
      <h2>User Information</h2>
      <div className={styles.cardShow}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={() => handleSoftDelete(user.id)} />
        ))}
      </div>
    </div>
  );
};
