//
//  RNHyperSnapSDK.m
//  HyperSnapSDK
//
//  Copyright © 2018 HyperVerge. All rights reserved.

#import "RNHyperSnapSDK.h"
#import "AppDelegate.h"

@implementation RNHyperSnapSDK

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(initialize:(NSString *)appId appKey:(NSString *)appKey region:(Region)region){
  [HyperSnapSDKConfig initializeWithAppId:appId appKey:appKey region: region];
}

RCT_EXPORT_METHOD(startUserSession:(NSString *)transactionId) {
  HVError *error = [HyperSnapSDKConfig startUserSession:transactionId];
  NSLog(@"HVErrorCode %ld", (long)error.getErrorCode);
}

RCT_EXPORT_METHOD(endUserSession) {
  [HyperSnapSDKConfig endUserSession];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end





