import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { auth, firestore } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        try {
          // Query to find user by email
          const usersRef = collection(firestore, 'Users');
          const q = query(usersRef, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const role = userData.role;
            
            // Navigate based on role
            let destination = '';
            if (role === 'admin') {
              destination = 'AdminDashboard';
            } else if (role === 'teacher') {
              destination = 'TeacherDashboard';
            } else {
              destination = 'StudentDashboard';
            }
            
            navigation.reset({
              index: 0,
              routes: [{ name: destination }],
            });
          } else {
            Alert.alert('Error', 'User data not found');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          Alert.alert('Error', 'Something went wrong');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleRoleSelect = (role) => {
    navigation.navigate('Login', { role });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3cb371" />
        <Text style={styles.loadingText}>Checking auth status...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#4caf50', '#8bc34a']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>SmartSchool Pro</Text>
        <Text style={styles.subtitle}>School Management System</Text>
        
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('admin')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#2196F3' }]}>
              <Icon name="account-cog" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Admin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('teacher')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#FF9800' }]}>
              <Icon name="school" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Teacher</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('student')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#9C27B0' }]}>
              <Icon name="account" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Student</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 50,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconBackground: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
  },
});

export default RoleSelectionScreen;            </View>
            <Text style={styles.iconLabel}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('teacher')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#28a745' }]}>
              <Icon name="school" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Teacher</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('student')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#ffc107' }]}>
              <Icon name="account" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Student</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 150,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#ffffff',
    elevation: 50,
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
  },
});

export default RoleSelectionScreen;          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('teacher')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#28a745' }]}>
              <Icon name="school" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Teacher</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('student')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#ffc107' }]}>
              <Icon name="account" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Student</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 150,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#ffffff',
    elevation: 50,
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
  },
});

export default RoleSelectionScreen;          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('teacher')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#28a745' }]}>
              <Icon name="school" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Teacher</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => handleRoleSelect('student')}
          >
            <View style={[styles.iconBackground, { backgroundColor: '#ffc107' }]}>
              <Icon name="account" size={50} color="#ffffff" />
            </View>
            <Text style={styles.iconLabel}>Student</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 150,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#ffffff',
    elevation: 50,
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
  },
});

export default RoleSelectionScreen;
