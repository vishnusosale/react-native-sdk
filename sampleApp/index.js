import React, { Component } from 'react';
import { PermissionsAndroid, Alert, TouchableHighlight, Modal,Platform,AppRegistry, View, Text, StyleSheet,Picker, TextInput, Button, NativeModules, LogBox } from 'react-native';
/*
Wrappers for HyperSnapSDK have been written and bridged to be accessed in React Native Apps. The below import statement is used to import the required Native Modules.
*/

const {RNHyperSnapSDK, RNHVDocsCapture, RNHVQRScanCapture, RNHVFaceCapture,   RNHyperSnapParams, RNHVNetworkHelper} = NativeModules;

import { YellowBox } from 'react-native';
/*
The bellow line is used to ignore certain warnings
*/
YellowBox.ignoreWarnings(['Module RCTImageLoader','Class RCTCxxModule']);

//Please add the appId and appKey received from HyperVerge here.
const appID = "";
const appKey= "";


var initSuccess=false;

class LandingPage extends Component //HomeScreen Class
{
    constructor(){
        super();
        this.state = {
          result:"",
          documentModalVisible: false,
          faceModalVisible: false,
          QRModalVisible: false,
          liveness: RNHyperSnapParams.LivenessModeNone,
          faceOutput: "",
          docType: RNHyperSnapParams.DocumentTypeCard,
          topText: "",
          bottomText: "",
          documentOutput: "",
          qrOutput: "",
        }
        if(Platform.OS==="android"){
          requestCameraPermission();
        }
        //Initializing the SDK
        if(appID=="" || appKey=="")
        {
          this.showAlert();
        }
        else{
          RNHyperSnapSDK.initialize(appID,appKey,RNHyperSnapParams.RegionAsiaPacific);
          initSuccess=true;
        }
    }

    showAlert(){
      Alert.alert(
        'Initialization Error',
        'The appID and appKey given while intializing the SDK are not valid!',
        [
          {text: 'OK!', style: 'cancel'},
        ],
        { cancelable: false }
      )
    }

    setDocumentModalVisible(visible){
      /* This method is used to set the visibility of the Modal for controling the Document Capture */
      this.setState({documentModalVisible: visible});
    }
    setFaceModalVisible(visible){
      /* This method is used to set the visibility of the Modal for controling the Face Capture */
      this.setState({faceModalVisible: visible});
    }

    setQRModalVisible(visible){
      /* This method is used to set the visibility of the Modal for controling the Face Capture */
      initSuccess ? this.setState({QRModalVisible: visible}) : this.showAlert();
    }
    printDictionary(dict,out,isSuccess){
      /* This method is used to print the results (dictonary) or errors (dictonary) after the activity call has been made */
        var result = ""
        if (isSuccess) {
          result = "Results:"
        }
        else{
          result = "Error Received:"
        }
        result = result + JSON.stringify(dict)
        console.log(result)
        // for (var key in dict) {
        //   // result = result + "\n"+ key + " : " + dict[key].string
        //   result = result + "\n"+ key + " : " + JSON.stringify(dict)
        // }
        if(out=="doc"){
          this.setState({documentOutput:result});
        } else if(out == "qr"){
          this.setState({qrOutput:result});
        }
        else{
          this.setState({faceOutput:result})
        }
    }

    hvDocs(){
      /* This method sets the document type, topText and bottomText and calls the Document capture activity*/
       console.log("HV Docs opened");
       


      if(this.state.topText.length>1 || this.state.documentOutput.length>1){
        RNHVDocsCapture.setDocCaptureTitle(this.state.topText);
      }
      if(this.state.bottomText.length>1 || this.state.documentOutput.length>1){
        RNHVDocsCapture.setDocCaptureDescription(this.state.bottomText);
      }


      var closure = (error,result,headers) => {
       
        RNHyperSnapSDK.endUserSession();
        // this.hvFace();
          if(error != null){
              this.setState({
                  topText: "  ",
                  bottomText: "  ",
                });
                this.printDictionary(error,"doc",false); //passing error to printDictonary to print the error
          }
          else{
            this.setState({
                topText: "  ",
                bottomText: "  ",
              });
              console.log("imageUri " + result["imageUri"])
              console.log("action " + result["action"])
              console.log("retakeMessage " + result["retakeMessage"])
              console.log("apiResult " + result["apiResult"])
              console.log("headers " + JSON.stringify(headers))
            this.printDictionary(result,"doc",true); //passing error to printDictonary to print the result
            docImageUri = result["imageUri"]

            //Uncomment next block to test OCR:

            // try{
            //   var params = {};
            //   var headers = {};
            //   var closure = (error,result,headers) => {
            //     if (error != null){
            //       this.printDictionary(error,"doc",true);
            //     } else {
            //       this.printDictionary(result,"doc",true);
            //     }

                
            //   }
            //   RNHVNetworkHelper.makeOCRCall("https://ind-docs-staging.hyperverge.co/v2.0/readKYC",docImageUri,params,headers,closure)
            // } catch(error){
            //   console.log('error')
            // }

            // Uncomment next block to test Face Match:

            // RNHVFaceCapture.start( (error,result,headers) => {
            //   if(error != null ){
            //     this.printDictionary(error,"face",false); //passing error to printDictonary to print the error
            //   }
            //   else{
            //     this.printDictionary(result,"face",true); //passing error to printDictonary to print the result
            //     faceImageUri = result["imageUri"]
            
            //     try{
            //       var params = {};
            //       var headers = {};
            //       var closure = (error,result,headers) => {
            //         if (error != null){
            //           this.printDictionary(error,"face",false);
            //         } else {
            //           this.printDictionary(result,"face",true);
            //         }
            //       }
            //       RNHVNetworkHelper.makeFaceMatchCall("https://apac.faceid.hyperverge.co/v1/photo/verifyPair",faceImageUri,docImageUri,params,headers,closure)
            //     } catch(error){
            //       console.log('error')
            //     }
            //   }
            // });
        }

      }

      RNHVDocsCapture.setShouldShowReviewScreen(true);      
      RNHVDocsCapture.setDocumentType(this.state.docType);
      
      var ocrParamString = `{
        "forgeryCheck" : "yes",
        "fraudCheck" : "yes",
        "returnPlaceOfIssue" : "yes",
        "dobForgeryCheck" : "yes",
        "doeForgeryCheck" : "yes",
        "emblemForgeryCheck" : "yes",
        "fetchSummary" : "yes",
        "dataLogging" : "yes",
        "dobColonForgeryCheck" : "yes"
        }`;

        var ocrParamsObject = JSON.parse(ocrParamString);
        var ocrHeaderObject = {}
      
      RNHyperSnapSDK.startUserSession("");
      RNHVDocsCapture.setOCRAPIDetails("https://vnm-docs.hyperverge.co/v2/nationalID", RNHyperSnapParams.DocumentFront, ocrParamsObject, ocrHeaderObject);
      
      RNHVDocsCapture.start(closure)
    }

    hvFace(){
      /* This method sets the liveness mode and calls the Face Capture activity */

      console.log("HV Face opened");
      RNHVFaceCapture.setShouldUseBackCamera(false);
      RNHyperSnapSDK.startUserSession("");

      RNHVFaceCapture.start( (error,result,headers) => {

        RNHyperSnapSDK.endUserSession();
          if(error != null ){
            this.printDictionary(error,"face",false); //passing error to printDictonary to print the error
          }
          else{
            this.printDictionary(result,"face",true); //passing error to printDictonary to print the result
            imageUri = result["imageUri"]

            try{
              var params = {};
              var headers = {};
              var closure = (error,result,headers) => {
                if (error != null){
                  this.printDictionary(error,"face",false);
                } else {
                  this.printDictionary(result,"face",true);
                }
              }
              // RNHVNetworkHelper.makeFaceMatchCall("https://apac.faceid.hyperverge.co/v1/photo/verifyPair",imageUri,"",params,headers,closure)
            } catch(error){
              console.log('error')
            }
          }
      });
}

qrScan()
{
  var qrClosure = (error,result) => {
    if(error != null){

          this.printDictionary(error,"qr",false); //passing error to printDictonary to print the error
    }
    else{

          this.printDictionary(result,"qr",true); //passing error to printDictonary to print the result
    }
}
    RNHVQRScanCapture.start(qrClosure)
}
  updateLiveness = (choice) => {
      this.setState({liveness: choice});
   }
    updateDoctype = (doctype) => {
         this.setState({docType: doctype});
      }

    render() {
        return (
          <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={this.state.documentModalVisible}  onRequestClose={() => null} >
            <View style={styles.container}>
                <Picker style={styles.inputstyle} selectedValue = {this.state.docType} onValueChange = {this.updateDoctype}>
                    <Picker.Item label="CARD" value={RNHyperSnapParams.DocumentTypeCard} />
                    <Picker.Item label="A4" value={RNHyperSnapParams.DocumentTypeA4} />
                    <Picker.Item label="PASSPORT" value={RNHyperSnapParams.DocumentTypePassport} />
                    <Picker.Item label="OTHER" value={RNHyperSnapParams.DocumentTypeOther} />
                </Picker>
                <Text>Top Text:</Text>
                <TextInput style={styles.inputstyle}
                onChangeText={(text)=>this.setState({topText: text,})}>
                </TextInput>
                <Text>Bottom Text:</Text>
                <TextInput style={styles.inputstyle}
                onChangeText={(text)=>this.setState({bottomText: text,})}>
                </TextInput>
                <Button style={styles.button} onPress={() => this.hvDocs()} title="Start Document Verification"/>
                <Text style={styles.results}>
                {this.state.documentOutput}
                </Text>
                <TouchableHighlight style={styles.button}
                onPress={() => {
                  this.setState({documentOutput: "   "});
                  this.setDocumentModalVisible(!this.state.documentModalVisible);
                }}>
                <Text>Go Back</Text>
              </TouchableHighlight>
            </View>
            </Modal>
            <Modal animationType="slide" transparent={true} visible={this.state.faceModalVisible} onRequestClose={() => null} >
            <View style={styles.container}>
            <Picker style={styles.inputstyle} selectedValue = {this.state.liveness} onValueChange = {this.updateLiveness}>
                <Picker.Item label="None" value={RNHyperSnapParams.LivenessModeNone} />
                <Picker.Item label="Texture Liveness" value={RNHyperSnapParams.LivenessModeTextureLiveness} />
            </Picker>
              <Button style={styles.button}
                onPress={() => this.hvFace()}
                title="Start Face Verification"
              />
                <Text style={styles.results}>
                {this.state.faceOutput}
                </Text>
                <TouchableHighlight style={styles.button}
                onPress={() => {
                  this.setState({faceOutput: "   "});
                  this.setFaceModalVisible(!this.state.faceModalVisible);
                }}>
                <Text>Go Back</Text>
              </TouchableHighlight>
            </View>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={this.state.QRModalVisible} onRequestClose={() => null} >
            <View style={styles.container}>

              <Button style={styles.button}
                onPress={() => this.qrScan()}
                title="Start QR Scanner"
              />
                <Text style={styles.results}>
                {this.state.qrOutput}
                </Text>
                <TouchableHighlight style={styles.button}
                onPress={() => {
                  this.setState({qrOutput: "   "});
                  this.setQRModalVisible(!this.state.QRModalVisible);
                }}>
                <Text>Go Back</Text>
              </TouchableHighlight>
            </View>
            </Modal>
            <Text style={styles.intro}>This is a demo application developed using the react native wrappers of HyperSnapSDK </Text>
              <View style={styles.subcontainer}><Button
                style={styles.button}
                onPress={()=>{this.setDocumentModalVisible(true);}}
                title="Document Capture"
              /></View>
              <View style={styles.subcontainer}><Button
                style={styles.button}
                onPress={()=>{this.setFaceModalVisible(true);}}
                title="Face Capture"/></View>

<View style={styles.subcontainer}><Button
                style={styles.button}
                onPress={()=>{this.setQRModalVisible(true);}}
                title="QR Capture"/></View>
          </View>


        );
      }
}

async function requestCameraPermission() {

    try {
        const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
        await PermissionsAndroid.request(permission);
        Promise.resolve();
      } catch (error) {
        Promise.reject(error);
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    intro: {
        margin: 10,
    },
    results: {
      fontSize: 18,
      textAlign: 'center',
      margin: 10,
    },
    subcontainer: {
      margin: 10,
  },
  inputstyle: {
      width: "50%",
      margin: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });

  AppRegistry.registerComponent('AwesomeNewWrappers', () => LandingPage);
