package com.myapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import org.reactnative.camera.RNCameraPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
}

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNCameraPackage(),
            new RNSpinkitPackage(),
            new ReactVideoPackage(),
            new PickerPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNAccountKitPackage(),
            new FBSDKPackage(mCallbackManager)
        );
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
    }
  }

