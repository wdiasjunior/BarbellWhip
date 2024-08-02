package com.barbellwhip;

import android.os.Bundle;
import android.content.Intent;
import android.util.Log;
import androidx.annotation.Nullable;
import android.net.Uri;
import android.content.ContentResolver;
import android.database.Cursor;
import android.provider.OpenableColumns;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "barbellwhip";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    handleIntent(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    if(intent != null) {
      String action = intent.getAction();
      String type = intent.getType();

      if (Intent.ACTION_SEND.equals(action) && type != null) {
        handleSendFile(intent);
      } else if (Intent.ACTION_SEND_MULTIPLE.equals(action) && type != null) {
        handleSendMultipleFiles(intent);
      }
    }
  }

  void handleSendFile(Intent intent) {
    Uri fileUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
    if(fileUri != null) {
      String fileName = getFileName(fileUri);
      sendToReactNative("file", fileUri.toString(), fileName);
    }
  }

  void handleSendMultipleFiles(Intent intent) {
    ArrayList<Uri> fileUris = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
    if(fileUris != null) {
      ArrayList<String> filePaths = new ArrayList<>();
      ArrayList<String> fileNames = new ArrayList<>();
      for(Uri uri : fileUris) {
        filePaths.add(uri.toString());
        fileNames.add(getFileName(uri));
      }
      sendToReactNative("files", filePaths.toString(), fileNames.toString());
    }
  }

  private String getFileName(Uri uri) {
    String result = null;
    if(uri.getScheme().equals("content")) {
      try(Cursor cursor = getContentResolver().query(uri, null, null, null, null)) {
        if(cursor != null && cursor.moveToFirst()) {
          result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
        }
      }
    }
    if(result == null) {
      result = uri.getLastPathSegment();
    }
    return result;
  }

  private void sendToReactNative(String type, String data, @Nullable String fileName) {
    WritableMap params = Arguments.createMap();
    params.putString("type", type);
    params.putString("data", data);
    if(fileName != null) {
      params.putString("fileName", fileName);
    }
    getReactInstanceManager().getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ShareIntent", params);
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
