package com.awesomenewwrappers;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import co.hyperverge.hypersnapsdk.HyperSnapSDK;
import co.hyperverge.hypersnapsdk.listeners.SessionStatusCallback;
import co.hyperverge.hypersnapsdk.objects.HVDocConfig;
import co.hyperverge.hypersnapsdk.objects.HVError;
import co.hyperverge.hypersnapsdk.objects.HVFaceConfig;
import co.hyperverge.hypersnapsdk.objects.HyperSnapParams;


public class RNHyperSnapSDK extends ReactContextBaseJavaModule {

    public RNHyperSnapSDK(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "RNHyperSnapSDK";
    }

    @ReactMethod
    public void initialize(String appId, String appName, String regionValue) {
        String[] regionParams = regionValue.split("\\.");
        HyperSnapParams.Region region = getHVHyperSnapParam(regionParams[0],
                regionParams[1], HyperSnapParams.Region.class);
        HyperSnapSDK.init(getCurrentActivity(), appId, appName, region);
    }

    /*@ReactMethod
    public void startUserSession(SessionStatusCallback callback){
        HyperSnapSDK.startUserSession(callback);
    }*/

    @ReactMethod
    public void startUserSession(String userID) {
        if (userID != null && userID.isEmpty()) {
            HyperSnapSDK.startUserSession(new SessionStatusCallback() {
                @Override
                public void onFailure(HVError hvError) {
                    Log.e("startUserSession", "hvError " + hvError.getErrorCode());
                }
            });
        } else {
            HyperSnapSDK.startUserSession(userID, new SessionStatusCallback() {
                @Override
                public void onFailure(HVError hvError) {
                    Log.e("startUserSession", "hvError " + hvError.getErrorCode());
                }
            });
        }
    }

    @ReactMethod
    public void endUserSession() {
        HyperSnapSDK.endUserSession();
    }

    public <T> T getHVHyperSnapParam(String enumClass, String param, Class<T> type) {
        switch (enumClass) {
            case "Product": {
                return type.cast(HyperSnapParams.Product.valueOf(param));
            }
            case "Region": {
                return type.cast(HyperSnapParams.Region.valueOf(param));
            }
            case "Document": {
                return type.cast(HVDocConfig.Document.valueOf(param));
            }
            case "LivenessMode": {
                return type.cast(HVFaceConfig.LivenessMode.valueOf(param));
            }
            default: {
                return null;
            }
        }
    }

}
