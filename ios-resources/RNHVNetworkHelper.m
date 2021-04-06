//
//  RNHVNetworkHelper.m
//  HyperSnapDemoApp_React
//
//  Copyright © 2019 Facebook. All rights reserved.

#import <Foundation/Foundation.h>
#import "AppDelegate.h"
#import "RNHVNetworkHelper.h"

@implementation RNHVNetworkHelper

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(makeOCRCall:(NSString*)endpoint docUri:(NSString*)docUri params:(NSDictionary<NSString *,id> * _Nullable)params headers:(NSDictionary<NSString *,id> * _Nullable)headers completionHandler:(RCTResponseSenderBlock)completionHandler){

  [HVNetworkHelper makeOCRAPICallWithEndpoint:endpoint documentUri:docUri parameters:params headers:headers completionHandler: ^( HVError* _Nullable error, HVResponse * _Nullable result){
    
    if(error != nil){
      NSMutableDictionary *errorDict = [[NSMutableDictionary alloc] init];
      NSNumber *errorCode = [NSNumber numberWithInteger:error.getErrorCode];
      NSString *errorMessage = [NSString stringWithString:error.getErrorMessage];
      [errorDict setValue: errorCode forKey: @"errorCode"];
      [errorDict setValue: errorMessage forKey: @"errorMessage"];
      if (result == nil) {
        completionHandler(@[errorDict, [NSNull null]]);
      }else{
        
        NSMutableDictionary *resultDict = [[NSMutableDictionary alloc] init];
        
        if (result.apiResult != nil) {
          NSDictionary<NSString *,id> *apiResult = result.apiResult;
          [resultDict setValue:apiResult forKey: @"apiResult"];
        }
        
        if (result.apiHeaders != nil) {
          NSDictionary<NSString *,id> *apiHeaders = result.apiHeaders;
          [resultDict setValue:apiHeaders forKey: @"apiHeaders"];
        }
        
        if (result.imageUri != nil) {
          NSString *imageUri = [NSString stringWithString:result.imageUri];
          [resultDict setValue:imageUri forKey: @"imageUri"];
        }
        
        
        if (result.fullImageUri != nil) {
          NSString *fullImageUri = [NSString stringWithString:result.fullImageUri];
          [resultDict setValue:fullImageUri forKey: @"fullImageUri"];
        }
        
        if (result.retakeMessage != nil) {
          NSString *retakeMessage = [NSString stringWithString:result.retakeMessage];
          [resultDict setValue:retakeMessage forKey: @"retakeMessage"];
        }
        
        
        if (result.action != nil) {
          NSString *action = [NSString stringWithString:result.action];
          [resultDict setValue:action forKey: @"action"];
        }
        
        completionHandler(@[errorDict, resultDict]);
      }
    }else{
      NSMutableDictionary *resultDict = [[NSMutableDictionary alloc] init];
      
      if (result.apiResult != nil) {
        NSDictionary<NSString *,id> *apiResult = result.apiResult;
        [resultDict setValue:apiResult forKey: @"apiResult"];
      }
      
      if (result.apiHeaders != nil) {
        NSDictionary<NSString *,id> *apiHeaders = result.apiHeaders;
        [resultDict setValue:apiHeaders forKey: @"apiHeaders"];
      }
      
      if (result.imageUri != nil) {
        NSString *imageUri = [NSString stringWithString:result.imageUri];
        [resultDict setValue:imageUri forKey: @"imageUri"];
      }
      
      if (result.fullImageUri != nil) {
        NSString *fullImageUri = [NSString stringWithString:result.fullImageUri];
        [resultDict setValue:fullImageUri forKey: @"fullImageUri"];
      }
      
      if (result.retakeMessage != nil) {
        NSString *retakeMessage = [NSString stringWithString:result.retakeMessage];
        [resultDict setValue:retakeMessage forKey: @"retakeMessage"];
      }
      
      
      if (result.action != nil) {
        NSString *action = [NSString stringWithString:result.action];
        [resultDict setValue:action forKey: @"action"];
      }
      
      completionHandler(@[[NSNull null], resultDict]);
    }
    
  }];
}

RCT_EXPORT_METHOD(makeFaceMatchCall:(NSString*)endpoint faceUri:(NSString*)faceUri docUri:(NSString*)docUri params:(NSDictionary<NSString *,id> * _Nullable)params headers:(NSDictionary<NSString *,id> * _Nullable)headers completionHandler:(RCTResponseSenderBlock)completionHandler){
  
  [HVNetworkHelper makeFaceMatchCallWithFaceUri:faceUri documentUri:docUri parameters:params headers:headers completionHandler: ^( HVError* _Nullable error,HVResponse * _Nullable result){
    
    if(error != nil){
      NSMutableDictionary *errorDict = [[NSMutableDictionary alloc] init];
      NSNumber *errorCode = [NSNumber numberWithInteger:error.getErrorCode];
      NSString *errorMessage = [NSString stringWithString:error.getErrorMessage];
      [errorDict setValue: errorCode forKey: @"errorCode"];
      [errorDict setValue: errorMessage forKey: @"errorMessage"];
      if (result == nil) {
        completionHandler(@[errorDict, [NSNull null], [NSNull null]]);
      }else{
        NSMutableDictionary *resultDict = [[NSMutableDictionary alloc] init];
        
        if (result.apiResult != nil) {
          NSDictionary<NSString *,id> *apiResult = result.apiResult;
          [resultDict setValue:apiResult forKey: @"apiResult"];
        }
        
        if (result.apiHeaders != nil) {
          NSDictionary<NSString *,id> *apiHeaders = result.apiHeaders;
          [resultDict setValue:apiHeaders forKey: @"apiHeaders"];
        }
        
        if (result.imageUri != nil) {
          NSString *imageUri = [NSString stringWithString:result.imageUri];
          [resultDict setValue:imageUri forKey: @"imageUri"];
        }
        
        if (result.fullImageUri != nil) {
          NSString *fullImageUri = [NSString stringWithString:result.fullImageUri];
          [resultDict setValue:fullImageUri forKey: @"fullImageUri"];
        }
        
        if (result.retakeMessage != nil) {
          NSString *retakeMessage = [NSString stringWithString:result.retakeMessage];
          [resultDict setValue:retakeMessage forKey: @"retakeMessage"];
        }
        
        
        if (result.action != nil) {
          NSString *action = [NSString stringWithString:result.action];
          [resultDict setValue:action forKey: @"action"];
        }
        
        completionHandler(@[errorDict, resultDict]);
      }
    }else{
      NSMutableDictionary *resultDict = [[NSMutableDictionary alloc] init];
      
      if (result.apiResult != nil) {
        NSDictionary<NSString *,id> *apiResult = result.apiResult;
        [resultDict setValue:apiResult forKey: @"apiResult"];
      }
      
      if (result.apiHeaders != nil) {
        NSDictionary<NSString *,id> *apiHeaders = result.apiHeaders;
        [resultDict setValue:apiHeaders forKey: @"apiHeaders"];
      }
      
      if (result.imageUri != nil) {
        NSString *imageUri = [NSString stringWithString:result.imageUri];
        [resultDict setValue:imageUri forKey: @"imageUri"];
      }
      
      if (result.fullImageUri != nil) {
        NSString *fullImageUri = [NSString stringWithString:result.fullImageUri];
        [resultDict setValue:fullImageUri forKey: @"fullImageUri"];
      }
      
      if (result.retakeMessage != nil) {
        NSString *retakeMessage = [NSString stringWithString:result.retakeMessage];
        [resultDict setValue:retakeMessage forKey: @"retakeMessage"];
      }
      
      
      if (result.action != nil) {
        NSString *action = [NSString stringWithString:result.action];
        [resultDict setValue:action forKey: @"action"];
      }
      
      completionHandler(@[[NSNull null], resultDict]);
    }
    
  }];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
