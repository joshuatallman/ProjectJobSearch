import { StyleSheet, Dimensions } from 'react-native';

export const topicItem = StyleSheet.create({
    container: {
        padding: 10,
        margin: 7,
        borderRadius: 7
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    }
})

export const intro = StyleSheet.create({
    banner: {
        height: Dimensions.get('window').height / 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25
    }
})

export const jobItem = StyleSheet.create({
    container: {
      padding: 12,
      margin: 7,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#bdbdbd'
    },
    jobname: {
      fontWeight: 'bold',
    },
  });

  export const jobs = StyleSheet.create({
    modalBackground: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10
    },
    jobTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    desc: {
      padding: 10
    }
  });