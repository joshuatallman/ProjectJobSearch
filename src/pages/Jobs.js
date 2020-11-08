import Axios from 'axios';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import { JobItem } from '../components';
import { jobs } from '../styles'

const Jobs = (props) => {
    const [data, setData] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [modalFlag, setModalFlag] = useState(false);
    const { selectedLanguage } = props.route.params;
    const fetchData = async () => {
        const response = await Axios.get(`https://jobs.github.com/positions.json?search=${selectedLanguage.toLowerCase()}`);
        setData(response.data);
        console.log(selectedLanguage);
        console.log(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onJobSelect = (job) => {
        setModalFlag(true);
        setSelectedJob(job);
    }

    const renderJobs = ( {item} ) => <JobItem job={item} onSelect={ () => onJobSelect(item) } />

    const onJobSave = async () => {
        let savedJobList = await AsyncStorage.getItem('@SAVED_JOBS');
        savedJobList = savedJobList == null ? [] : JSON.parse(savedJobList);

        const updatedJobList = [...savedJobList, selectedJob];
        await AsyncStorage.setItem('@SAVED_JOBS', JSON.stringify(updatedJobList));
        console.log(updatedJobList);
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
    <Text style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: 'red'}}>Jobs Page for {selectedLanguage.toUpperCase()}</Text>
                <FlatList 
                data={data}
                renderItem={renderJobs}
                />

                <TouchableOpacity 
                style={{ 
                    backgroundColor: 'red', 
                    margin: 10, 
                    padding: 10, 
                    borderRadius: 5, 
                    position: 'absolute', 
                    bottom: 5, 
                    right: 10
                    }}
                    onPress={() => props.navigation.navigate('SavedJobs')}
                    >
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Kayıtlıları Gör</Text>
                </TouchableOpacity>
                
                <Modal isVisible={modalFlag} onBackdropPress={() => setModalFlag(false)} >
                    <View style={jobs.modalBackground}>
                        <View style={{borderBottomWidth: 4, borderColor: '#b0b0b0', marginBottom: 10}}>
                        <Text style={jobs.jobTitle}>{selectedJob.title}</Text>
                        <Text>{selectedJob.location} / {selectedJob.type}</Text>
                        <Text>{selectedJob.company}</Text>
                        </View>

                        <View style={jobs.desc}>
                        <Text numberOfLines={5} >{selectedJob.description}</Text>
                        </View>

                        <Button title="Kaydet" onPress={onJobSave} />

                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

export { Jobs }