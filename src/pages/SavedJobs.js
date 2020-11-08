import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { JobItem } from '../components';

const SavedJobs = (props) => {
    const [jobList, setJobList] = useState([]);

    AsyncStorage.getItem('@SAVED_JOBS')
        .then(res => {
            const list = JSON.parse(res);
            setJobList(list);
        })

        const renderJobs = ( {item} ) => <JobItem job={item} />

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Text>SavedJobs Page</Text>
                <FlatList
                data={jobList}
                renderItem={renderJobs}
                />
                <TouchableOpacity 
                style={{ 
                    backgroundColor: 'red', 
                    margin: 10, 
                    padding: 10, 
                    borderRadius: 5, 
                    position: 'absolute', 
                    bottom: 25, 
                    right: 50
                    }}
                onPress={() => props.navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export { SavedJobs }