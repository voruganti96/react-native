import React, { Component } from "react";  
import { StyleSheet, View, TextInput, Text, Button,Picker,ScrollView }  from "react-native";
//import DatePicker from 'react-native-datepicker';
//import TimePicker from 'react-native-simple-time-picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { CheckBox } from 'react-native-elements'

class App extends Component { 

  constructor(props) {
    super(props);
    this.delTask = this.delTask.bind(this);
    this.isDone = this.isDone.bind(this);
    this.getMoviesFromApiAsync();
    this.getMoviesFromApi();
    // fetch('http://127.0.0.1:5000/api/gettasks')
    // .then((response) => response.json())
    // .then((tasks) => {
    //   this.setState({ tasks: tasks });
    // })
    // .catch((error) => {
    //   console.error(error);
    // });


    
  }

  getMoviesFromApi() {
  return fetch('http://127.0.0.1:5000/api/gettasks',{mode: 'no-cors'})
    .then((response) => response)
    .then((tasks) => {
      console.log(tasks);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  async getMoviesFromApiAsync(){
    try {
      let response = await fetch(
        'http://127.0.0.1:5000/api/gettasks',{mode: 'no-cors'}
      );
      let tasks = await response;
      console.log(tasks);
      // this.setState({ tasks: tasks });


    } catch (error) {
      console.error(error);
    }
  } 
  
  state = {  

    taskName : "",
    userTask : "",
    
    date : "",
	tableHead: ['S No.', 'Task', 'Due Date','IsDone','Actions'],
    
    tasks : [],
	widthArr: [40, 120, 70, 70, 70]

  
  }
  


  userNameListChange = (inputText) => {  
    this.setState({ taskName: inputText })  
  } 
  
  
  userdateTextChange = (inputText) => {  
    this.setState({ userTask: inputText })  
  } 
  onChangetime = time => this.setState({ time })
  
  
  
  addTask = () => {  
    let tasks = this.state.tasks;
    tasks.push([this.state.taskName,this.state.date, false]);
    this.setState({ tasks: tasks });
    console.log(this.state.tasks);
    this.setState({taskName : "",date : ""});    

    fetch('http://127.0.0.1:5000/api/addtask', {
      method: 'POST',
      mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        task_name: this.state.taskName,
        due_date: this.state.date,
        is_done: false
      })
    });
  } 

  delTask(index){
	  console.log(index);
	  let task_list = this.state.tasks;
	  task_list.splice(index, 1);
      this.setState({tasks: task_list});   
  }

  isDone(index){
    console.log(index);
    let task_list = this.state.tasks;
    // task_list.splice(index, 1);
    task_list[index][2]=true;
    this.setState({tasks: task_list});
  }




  render() {   
	const data = [];
    for (let i = 0; i < this.state.tasks.length; i += 1) {
      const dataRow = [];
	  dataRow.push(i+1);
      dataRow.push(this.state.tasks[i][0]);
	  dataRow.push(this.state.tasks[i][1]);
    if(!this.state.tasks[i][2]){
      dataRow.push(<CheckBox
      center
      
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checked={this.state.tasks[i][2]}
      onPress={() => this.isDone(i)} 
      />)
    }
    else{
      dataRow.push("DONE")
    }
    
	  if(true){
		  dataRow.push(<Button  
				title="DEL"  
				color="yellow"  
				onPress={() => this.delTask(i)} 
		  /> );
	  }

    
    
      
      data.push(dataRow);
      // console.log(checked);
    }
    return (  
      <ScrollView >
      <View style={styles.container}>  
        <Text style={styles.txtLogin}>TO DO List</Text>
        
        <TextInput
          style={styles.textInputStyle}  
          onChangeText={this.userNameListChange}
          value = {this.state.taskName}
          placeholder="Add Task Name"  
          placeholderTextColor="brown"  
        /> 
         <TextInput
          style={styles.textInputStyle}  
          onChangeText={(date) => {this.setState({date: date})}}
          value = {this.state.date}
          placeholder="Add date"  
          placeholderTextColor="brown"  
        /> 
        
        {/* <TextInput
          style={styles.textInputStyle}  
          onChangeText={this.userListTextChange}
          placeholder="Task Details"  
          placeholderTextColor="black"  
        /> 
        */}
        {/* <DatePicker
        style = {styles.textInputStyle}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      /> */}
     
            
      <View style={{ margin: 25 }}>  
          <Button  
            title="ADD"  
            color="#3642ba"  
            onPress={this.addTask}
      /> 
      </View>
      </View>
      <View >
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
				<Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.head} textStyle={styles.text}/>
                {
                  data.map((dataRow, index) => (
                    <Row
                      key={index}
                      data={dataRow}
                      widthArr={this.state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
      </View> 
      </ScrollView>
    ); 
    }
}  
  




const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: "flex-start",  
    alignContent: "center",  
    margin: 10, 
    backgroundColor: "#23274a", 
    
     
  },  
  textInputStyle: {  
    borderColor: "brown",  
    borderWidth: 1,  
    height: 50,  
    marginLeft: 20,  
    marginRight: 20,  
    padding: 5,  
    marginTop: 8,
    
    backgroundColor: "#00FF00",   
    
  },  
  txtLogin: {  
    
    fontWeight: "bold",  
    fontSize: 25,
    
    height: 50,  
    marginLeft: 20,  
    marginRight: 20,  
    padding: 5,  
    marginTop: 8,
    
    backgroundColor: "#4169e1", 
    textAlign:"center",
    margin : 5,
    

  },
  txtLogin1: {  
    padding: 15,
    backgroundColor: "yellow", 
    
    fontWeight: "bold",  
    fontSize: 20,
    textAlign:"center",
    margin: 5,
  },

  head: { 
    height: 50, 
    backgroundColor: '#0d1138' 
  },
  text: { 
    color:'white',
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#8c8887' 
  }  
}); 
  
export default App;  